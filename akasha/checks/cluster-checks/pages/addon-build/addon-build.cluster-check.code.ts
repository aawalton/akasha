#!/usr/bin/env bun

import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { ownRepoRoot } from "@akasha/pages-system/checkout-roots"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { computeInputsHashAcrossRepos } from "@akasha/workflow-language/inputs-hash"
import {
  ADDON_BUILD_CONCURRENCY,
  cacheTarPath,
  closureFilesForDeployable,
  deployableSeeds,
  missingSeeds,
} from "../../../../../tools/lib/check-workflow/addon-build-cache.ts"
import {
  type AddonInfo,
  type DeployableInfo,
  listAllAddons,
} from "../../../../../tools/lib/check-workflow/addons-resolve.ts"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"
import {
  addonBuildPopulationLine,
  addonBuildTally,
  type DeployableOutcome,
} from "../../modules/addon-build-population/addon-build-population.module.code.ts"
import { parseArgs as parseCliArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[addon-build]"
const ADDONS_DIST_REL = "temper/addons/dist"
const OPS_CLI_REL = "tools/ops/cli.ts"
const BUILD_COMMAND = ["temper", "addon", "build"] as const

const DEPLOYABLE_LEAST_COUNT = 40

const DEPLOYABLE_LEAST_COUNT_FROM =
  "the addon roster `listAllAddons` reads off the workspace catalog: every workspace carrying " +
  "an `addon.json` is deployable, and that walk found 48 addons when this least count was set"

const FLAG_SPEC = {
  treeSha: { kind: "string", required: true },
  cacheDir: { kind: "string" },
  concurrency: { kind: "number", default: ADDON_BUILD_CONCURRENCY },
} as const

interface CliArgs {
  readonly treeSha: string
  readonly cacheDir: string
  readonly concurrency: number
}

let deployableRoster: readonly string[] | undefined
const outcomes = new Map<string, DeployableOutcome>()

function statePopulation(): undefined {
  if (deployableRoster === undefined) {
    process.stdout.write(`${PREFIX} no deployable roster was discovered: no population examined\n`)
    return
  }
  const tally = addonBuildTally(deployableRoster, outcomes)
  if (tally.notAttempted.length > 0) {
    process.stdout.write(`${PREFIX} never attempted: ${tally.notAttempted.join(", ")}\n`)
  }
  process.stdout.write(`${PREFIX} ${addonBuildPopulationLine(tally)}\n`)
}

function fail(message: string): never {
  process.stderr.write(`${PREFIX} ${message}\n`)
  statePopulation()
  process.exit(2)
}

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    fail(errorMessage(err))
  }
  if (parsed.positionals.length > 0) fail(`unknown argument: ${parsed.positionals[0]}`)
  const concurrency = parsed.flags.concurrency
  if (!Number.isInteger(concurrency) || concurrency < 1) {
    fail(`--concurrency must be a positive integer, got: ${concurrency}`)
  }
  return {
    treeSha: parsed.flags.treeSha,
    cacheDir: parsed.flags.cacheDir ?? "/ci-storage/addon-build",
    concurrency,
  }
}

const listDeployables = (roster: readonly AddonInfo[]): readonly DeployableInfo[] =>
  roster
    .map((a) => ({ name: a.canonicalName, workspaceClosure: a.workspaceClosure }))
    .sort((a, b) => a.name.localeCompare(b.name))

const buildCmd = (repoRoot: string, deployable: DeployableInfo): readonly string[] => [
  "bun",
  join(ownRepoRoot(), OPS_CLI_REL),
  ...BUILD_COMMAND,
  deployable.name,
  "--build-only",
  "--code-root",
  repoRoot,
]

async function restoreFromCache(tarPath: string, distDir: string): Promise<boolean> {
  const proc = Bun.spawn(["tar", "-xf", tarPath, "-C", distDir], {
    stdio: ["inherit", "inherit", "inherit"],
  })
  await proc.exited
  return proc.exitCode === 0
}

async function runBuild(repoRoot: string, deployable: DeployableInfo): Promise<boolean> {
  const proc = Bun.spawn([...buildCmd(repoRoot, deployable)], {
    cwd: repoRoot,
    stdio: ["inherit", "inherit", "inherit"],
  })
  await proc.exited
  return proc.exitCode === 0
}

async function publishToCache(tarPath: string, distDir: string, name: string): Promise<void> {
  const tmp = `${tarPath}.tmp-${process.pid}`
  const create = Bun.spawn(["tar", "-cf", tmp, "-C", distDir, name], {
    stdio: ["inherit", "inherit", "inherit"],
  })
  await create.exited
  if (create.exitCode !== 0) {
    await Bun.spawn(["rm", "-f", tmp]).exited
    fail(`tar create failed for deployable "${name}"`)
  }
  const mv = Bun.spawn(["sh", "-c", `mv "${tmp}" "${tarPath}" 2>/dev/null || rm -f "${tmp}"`])
  await mv.exited
}

async function inPool<T>(
  items: readonly T[],
  limit: number,
  each: (item: T) => Promise<void>
): Promise<void> {
  let next = 0
  const worker = async (): Promise<void> => {
    for (let i = next++; i < items.length; i = next++) {
      const item = items[i]
      if (item !== undefined) await each(item)
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
}

async function main(): Promise<void> {
  const args = parseArgs()
  const repoRoot = codeRoot()
  const distDir = join(repoRoot, ADDONS_DIST_REL)

  let cacheEnabled = true
  try {
    mkdirSync(args.cacheDir, { recursive: true })
  } catch {
    cacheEnabled = false
    process.stderr.write(`${PREFIX} cache dir ${args.cacheDir} unwritable — building uncached\n`)
  }
  mkdirSync(distDir, { recursive: true })

  let graph: Graph
  try {
    graph = await buildFrom(readAt(args.treeSha).ctx)
  } catch (err) {
    fail(`graph build failed at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const addons = listAllAddons(repoRoot)
  const deployables = listDeployables(addons)
  deployableRoster = deployables.map((d) => d.name)
  if (deployables.length < DEPLOYABLE_LEAST_COUNT) {
    fail(
      `the addon roster holds ${deployables.length} deployable(s), fewer than the ${DEPLOYABLE_LEAST_COUNT} this check is stated to cover — ${DEPLOYABLE_LEAST_COUNT_FROM}; refusing to pass on a roster that may have emptied under it`
    )
  }

  const drifted = deployables
    .map((d) => ({ name: d.name, missing: missingSeeds(graph, deployableSeeds(d, addons)) }))
    .filter((d) => d.missing.length > 0)
  if (drifted.length > 0) {
    fail(
      `${drifted.length} of ${deployables.length} deployable(s) have seed(s) absent from the graph — closure would under-include; refusing to build on a partial closure: ${drifted
        .map((d) => `${d.name} (${d.missing.join(", ")})`)
        .join("; ")}`
    )
  }

  const failures: string[] = []

  await inPool(deployables, args.concurrency, async (deployable) => {
    if (failures.length > 0) return

    const files = closureFilesForDeployable(graph, deployable, addons)
    const hash = await computeInputsHashAcrossRepos({
      roots: { code: repoRoot, instructions: ownRepoRoot() },
      files,
    })
    const tarPath = cacheTarPath(args.cacheDir, deployable.name, hash)

    if (cacheEnabled && (await Bun.file(tarPath).exists())) {
      if (await restoreFromCache(tarPath, distDir)) {
        outcomes.set(deployable.name, "hit")
        process.stdout.write(`${PREFIX} cache hit: ${deployable.name} (${hash})\n`)
        return
      }
      process.stderr.write(`${PREFIX} cache extract failed for ${deployable.name}; rebuilding\n`)
    }

    process.stdout.write(`${PREFIX} building: ${deployable.name} (${hash})\n`)
    if (!(await runBuild(repoRoot, deployable))) {
      process.stderr.write(`${PREFIX} build failed for ${deployable.name}\n`)
      outcomes.set(deployable.name, "failed")
      failures.push(deployable.name)
      return
    }
    outcomes.set(deployable.name, "built")
    if (cacheEnabled) await publishToCache(tarPath, distDir, deployable.name)
  })

  if (failures.length > 0) {
    process.stderr.write(`${PREFIX} build failed for: ${failures.join(", ")}\n`)
    statePopulation()
    process.exit(1)
  }

  statePopulation()
}

main().catch((err: unknown) => {
  process.stderr.write(`${PREFIX} Unexpected error: ${errorMessage(err)}\n`)
  process.exit(2)
})
