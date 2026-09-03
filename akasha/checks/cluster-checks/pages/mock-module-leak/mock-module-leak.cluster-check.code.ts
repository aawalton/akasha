#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import {
  type BarrelRebindingFinding,
  findBarrelRebindingViolations,
} from "../../../../../infra/cluster-checks/src/lib/barrel-rebinding.ts"
import { parseArgs as parseCliArgs } from "../../../../../infra/cluster-checks/src/lib/cli-args.ts"
import {
  type FetchSeamLeakFinding,
  findFetchSeamLeakViolations,
} from "../../../../../infra/cluster-checks/src/lib/fetch-seam-leak.ts"
import {
  buildMockLeakContext,
  type MockLeakContext,
  slotKeyOf,
} from "../../../../../infra/cluster-checks/src/lib/mock-module-leak-context.ts"
import { refuseRetired } from "../../../../../infra/cluster-checks/src/lib/retired.ts"
import { CODE_REPO } from "../../../../../repo/scope/scope.ts"
import { examinePopulation } from "../../../../../tools/lib/check-workflow/population"
import {
  exitOnResult,
  exitOnToolError,
} from "../../../../../tools/lib/check-workflow/violation-reporter"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import { readRepoFile } from "../../../../../tools/lib/graph/repos.ts"
import type { BuildContext, Graph } from "../../../../../tools/lib/graph/types.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[mock-module-leak]"

export type MockModuleLeakFinding = {
  readonly file: string
  readonly line: number
  readonly specifier: string
  readonly stubbedExports: readonly string[]
  readonly consumers: readonly string[]
}

export const findMockModuleLeakViolations = (
  ctx: MockLeakContext
): readonly MockModuleLeakFinding[] => {
  const findings: MockModuleLeakFinding[] = []

  for (const site of ctx.sites) {
    if (site.mockerType === null) continue
    if (site.targetRel === null || !site.objectLiteral) continue
    if (site.mockerPackage === null) continue

    const stubbedExports = new Set<string>()
    const consumerFiles = new Set<string>()
    for (const { key, definer } of site.stubbedSlots) {
      const consumers = (ctx.slotConsumers.get(slotKeyOf(definer)) ?? []).filter(
        (c) => c.file !== site.mockerRel && c.package === site.mockerPackage
      )
      if (consumers.length === 0) continue
      stubbedExports.add(key)
      for (const c of consumers) consumerFiles.add(c.file)
    }
    if (stubbedExports.size === 0) continue

    findings.push({
      file: site.mockerRel,
      line: site.line,
      specifier: site.specifier,
      stubbedExports: [...stubbedExports].sort(),
      consumers: [...consumerFiles].sort(),
    })
  }

  findings.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    if (a.line !== b.line) return a.line - b.line
    return a.specifier < b.specifier ? -1 : a.specifier > b.specifier ? 1 : 0
  })
  return findings
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

type ReportedFinding =
  | ({ readonly kind: "leak" } & MockModuleLeakFinding)
  | ({ readonly kind: "rebind" } & BarrelRebindingFinding)
  | ({ readonly kind: "fetch-seam" } & FetchSeamLeakFinding)

function formatViolation(v: ReportedFinding): string {
  if (v.kind === "leak") {
    return `${v.file}:${v.line}  ${v.specifier} — stubs ${v.stubbedExports.join(", ")} (delegate to the real module; depended on by ${v.consumers.join(", ")})`
  }
  if (v.kind === "fetch-seam") {
    return `${v.file}:${v.line}  ${v.specifier} — stubs fetch seam ${v.stubbedExports.join(", ")} (defined in ${v.seam}; leaks across test-types into globalThis.fetch victims ${v.consumers.join(", ")} — use the benign-default wrapper that restores the real seam in afterAll)`
  }
  return `${v.file}:${v.line}  ${v.specifier} — stubs re-exported ${v.stubbedExports.join(", ")} (defined in ${v.definingModule}; the stub rebinds that slot for internal importers ${v.internalImporters.join(", ")} — delegate to a pre-install snapshot const)`
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

interface CliArgs {
  readonly jsonOutput: boolean
  readonly treeSha: string
}

function toolExit(message: string): never {
  return exitOnToolError({ error: new Error(message), prefix: PREFIX })
}

function parseArgs(): CliArgs {
  let parsed: ReturnType<typeof parseCliArgs<typeof FLAG_SPEC>>
  try {
    parsed = parseCliArgs(process.argv.slice(2), FLAG_SPEC)
  } catch (err) {
    return toolExit(errorMessage(err).replace(/^Unknown flag: /, "unknown argument: "))
  }
  if (parsed.positionals.length > 0) {
    return toolExit(`unknown argument: ${parsed.positionals[0]}`)
  }
  return { jsonOutput: parsed.flags.json, treeSha: parsed.flags.treeSha }
}

const MEMBERSHIP_BECAUSE =
  "the members are the `mock-module` edges of the graph built from the snapshot read at the tree " +
  "sha above, walked once into `ctx.sites` and handed to all three rules, so no rule enumerated " +
  "its own; a snapshot that cannot be read or a build that cannot complete throws out of the " +
  "`toolExit` beside it rather than handing back a graph with some of those edges missing"

async function main(): Promise<never> {
  const args = parseArgs()

  let ctx: BuildContext
  let graph: Graph
  try {
    ctx = readAt(args.treeSha).ctx
    graph = await buildFrom(ctx)
  } catch (err) {
    return toolExit(`failed to build the ts-file graph at ${args.treeSha}: ${errorMessage(err)}`)
  }

  const root = codeRoot()
  const leakCtx = buildMockLeakContext(graph)

  const leakFindings = findMockModuleLeakViolations(leakCtx)
  const rebindFindings = findBarrelRebindingViolations(leakCtx)
  const fetchSeamFindings = findFetchSeamLeakViolations(leakCtx, (rel) =>
    readRepoFile(ctx, CODE_REPO, rel)
  )
  const findings: ReportedFinding[] = [
    ...leakFindings.map((f) => ({ kind: "leak" as const, ...f })),
    ...rebindFindings.map((f) => ({ kind: "rebind" as const, ...f })),
    ...fetchSeamFindings.map((f) => ({ kind: "fetch-seam" as const, ...f })),
  ]

  const siteKey = (site: { file: string; line: number; specifier: string }): string =>
    `${site.file}:${site.line} ${site.specifier}`
  const callSites = leakCtx.sites.map((site) => ({
    file: site.mockerRel,
    line: site.line,
    specifier: site.specifier,
  }))

  const findingsBySite = new Map<string, ReportedFinding[]>()
  for (const finding of findings) {
    const list = findingsBySite.get(siteKey(finding)) ?? []
    list.push(finding)
    findingsBySite.set(siteKey(finding), list)
  }

  const { population } = examinePopulation({
    members: callSites,
    unit: "mock.module call sites",
    membership: { kind: "enumerated", because: MEMBERSHIP_BECAUSE },
    labelOf: siteKey,
    siteOf: (site) => resolve(root, site.file),
    examine: (site) => findingsBySite.get(siteKey(site)) ?? [],
  })

  return exitOnResult({
    violations: findings,
    options: {
      population,
      format: args.jsonOutput ? "json" : "human",
      prefix: PREFIX,
      header: `mock.module leaks (sibling-test stubs + barrel re-export rebinds) — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No mock.module leak violations detected.",
      groupBy: (v) => topLevelGroup(v.file),
      formatViolation,
    },
  })
}

if (import.meta.main) {
  main().catch((err: unknown) => {
    exitOnToolError({ error: err, prefix: PREFIX })
  })
}
