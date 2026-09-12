import { readFileSync } from "node:fs"
import { addonManifestPathIn } from "akasha/temper/addons-resolve/modules/addon-manifest-file/addon-manifest-file.module.code.ts"
import {
  type AddonInfo,
  listAllAddons,
} from "akasha/temper/addons-resolve/modules/addon-roster/addon-roster.module.code.ts"
import {
  parseArgs as parseCliArgs,
  REPO_ROOT_FLAG,
} from "akasha/temper/build-deploy-checks/cli-args/cli-args.module.code.ts"
import { errorMessage } from "akasha/temper/build-deploy-checks/error-message/error-message.module.code.ts"
import {
  type AddonDepInput,
  type DependencyCycleViolation,
  findDependencyCycles,
} from "akasha/temper/build-deploy-checks/modules/addon-dependency-cycle/addon-dependency-cycle.module.code.ts"
import { EMPTY_ADDON_ROSTER_HINT } from "akasha/temper/build-deploy-checks/modules/addon-roster-guard/addon-roster-guard.module.code.ts"
import { renderPopulationBound } from "akasha/temper/build-deploy-checks/population-bound/population-bound.module.code.ts"
import { getRepoRoot } from "akasha/temper/build-deploy-checks/repo-root/repo-root.module.code.ts"
import { z } from "zod"

const PREFIX = "[addon-dependency-cycle]"

const ADDON_JSON_SCHEMA = z
  .object({
    name: z.string().optional(),
    dependsOn: z.array(z.string()).optional(),
    optionalDependsOn: z.array(z.string()).optional(),
  })
  .passthrough()

function readDeps(root: string, addonDir: string): readonly string[] {
  const path = addonManifestPathIn(root, addonDir)
  if (path === null) {
    throw new Error(
      `${PREFIX} ${addonDir} is on the addon roster and holds no manifest the game or a page names, so its declared dependencies cannot be read`
    )
  }
  const raw = readFileSync(path, "utf8")
  const parsed = ADDON_JSON_SCHEMA.parse(JSON.parse(raw))
  return [...(parsed.dependsOn ?? []), ...(parsed.optionalDependsOn ?? [])]
}

function buildInputs(root: string, roster: readonly AddonInfo[]): readonly AddonDepInput[] {
  const inputs: AddonDepInput[] = []
  for (const addon of roster) {
    inputs.push({ addonName: addon.canonicalName, deps: readDeps(root, addon.dir) })
  }
  return inputs
}

function reportHuman(
  violations: readonly DependencyCycleViolation[],
  addonsExamined: number,
  addonsOnRoster: number
): undefined {
  const bound = renderPopulationBound({
    examined: addonsExamined,
    declared: addonsOnRoster,
    unit: "addons",
  })
  if (violations.length === 0) {
    process.stdout.write(`${PREFIX} the addon dependency graph is acyclic. ${bound}\n`)
    return
  }
  process.stdout.write(
    `${PREFIX} circular addon load dependencies — ${violations.length} cycle(s):\n\n`
  )
  for (const v of violations) {
    process.stdout.write(`  - ${v.message}\n`)
  }
  process.stdout.write(`\n${PREFIX} ${violations.length} cycle(s) found ${bound}\n`)
}

function main(): 0 | 1 | 2 {
  let asJson = false
  try {
    const { flags } = parseCliArgs(
      process.argv.slice(2),
      { json: { kind: "boolean" } },
      { passthrough: true }
    )
    asJson = flags.json ?? false
  } catch {
    asJson = false
  }

  let violations: readonly DependencyCycleViolation[]
  let addonsExamined = 0
  let addonsOnRoster = 0
  try {
    const repoRoot =
      parseCliArgs(process.argv.slice(2), REPO_ROOT_FLAG, { passthrough: true }).flags.repoRoot ??
      getRepoRoot()
    const roster = listAllAddons({ repoRoot })
    if (roster.length === 0) {
      process.stderr.write(`${PREFIX} ${EMPTY_ADDON_ROSTER_HINT}\n`)
      return 2
    }
    addonsOnRoster = roster.length
    const inputs = buildInputs(repoRoot, roster)
    addonsExamined = inputs.length
    violations = findDependencyCycles(inputs)
  } catch (err) {
    process.stderr.write(`${PREFIX} tool error: ${errorMessage(err)}\n`)
    return 2
  }

  if (asJson) {
    for (const v of violations) process.stdout.write(`${JSON.stringify(v)}\n`)
  } else {
    reportHuman(violations, addonsExamined, addonsOnRoster)
  }
  return violations.length === 0 ? 0 : 1
}

if (import.meta.main) {
  process.exit(main())
}
