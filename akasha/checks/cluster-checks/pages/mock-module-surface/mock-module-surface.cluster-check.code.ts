#!/usr/bin/env bun

import { resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { errorMessage } from "@akasha/temper-build-deploy-checks/error-message"
import { buildFrom, readAt } from "../../../../../tools/lib/graph/held-snapshot.ts"
import {
  MockModuleAttrsSchema,
  MockModuleUnreadableSpecifierAttrsSchema,
} from "../../../../../tools/lib/graph/producers/file/ts-file/parse-mock-module.ts"
import {
  MOCK_MODULE_EDGE_TYPE,
  MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE,
  tsFileNodeIdToCodeRepoRel,
} from "../../../../../tools/lib/graph/producers/file/ts-file/types.ts"
import type { Graph } from "../../../../../tools/lib/graph/types.ts"
import { parseArgs } from "../../modules/cli-args/cli-args.module.code.ts"
import { examinePopulation } from "../../modules/population/population.module.code.ts"
import { refuseRetired } from "../../modules/retired/retired.module.code.ts"
import { computeRuntimeExportSurface } from "../../modules/runtime-export-surface/runtime-export-surface.module.code.ts"
import {
  exitOnResult,
  exitOnToolError,
} from "../../modules/violation-reporting/violation-reporting.module.code.ts"

if (import.meta.main) refuseRetired()

const PREFIX = "[mock-module-surface]"

const CALL_SITE_LEAST_COUNT = 90

const CALL_SITE_LEAST_COUNT_FROM =
  "the `mock-module` and `mock-module-unreadable-specifier` edges the graph draws from every " +
  "`mock.module(` call in a `*.test.ts[x]` file outside `__fixtures__`; that population held " +
  "118 call sites across 60 files when this least count was set"

const isTestFile = (rel: string): boolean => rel.endsWith(".test.ts") || rel.endsWith(".test.tsx")

const isFixturePath = (rel: string): boolean => rel.includes("/__fixtures__/")

export type MockModuleSurfaceFinding =
  | {
      readonly kind: "unanalyzable-factory"
      readonly file: string
      readonly line: number
      readonly specifier: string
      readonly reason: string
      readonly expectedKeys: readonly string[] | null
    }
  | {
      readonly kind: "missing-keys"
      readonly file: string
      readonly line: number
      readonly specifier: string
      readonly missing: readonly string[]
    }
  | {
      readonly kind: "unreadable-specifier"
      readonly file: string
      readonly line: number
      readonly specifierText: string
    }

const findingSpecifierLabel = (finding: MockModuleSurfaceFinding): string =>
  finding.kind === "unreadable-specifier" ? finding.specifierText : finding.specifier

export const findMockModuleSurfaceViolations = (
  graph: Graph
): readonly MockModuleSurfaceFinding[] => {
  const findings: MockModuleSurfaceFinding[] = []

  for (const edge of graph.edges({ type: [MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE] })) {
    const fromRel = tsFileNodeIdToCodeRepoRel(edge.from)
    if (fromRel === null) continue
    if (!isTestFile(fromRel)) continue
    if (isFixturePath(fromRel)) continue

    const attrs = MockModuleUnreadableSpecifierAttrsSchema.parse(edge.attrs)
    findings.push({
      kind: "unreadable-specifier",
      file: fromRel,
      line: attrs.line,
      specifierText: attrs.specifierText,
    })
  }

  for (const edge of graph.edges({ type: [MOCK_MODULE_EDGE_TYPE] })) {
    const fromRel = tsFileNodeIdToCodeRepoRel(edge.from)
    if (fromRel === null) continue
    if (!isTestFile(fromRel)) continue
    if (isFixturePath(fromRel)) continue

    const attrs = MockModuleAttrsSchema.parse(edge.attrs)

    if (attrs.factory.kind === "unanalyzable") {
      findings.push({
        kind: "unanalyzable-factory",
        file: fromRel,
        line: attrs.line,
        specifier: attrs.specifier,
        reason: attrs.factory.reason,
        expectedKeys:
          tsFileNodeIdToCodeRepoRel(edge.to) === null
            ? null
            : computeRuntimeExportSurface(graph, edge.to),
      })
      continue
    }

    if (tsFileNodeIdToCodeRepoRel(edge.to) === null) continue

    const surface = computeRuntimeExportSurface(graph, edge.to)
    if (surface === null) continue

    const factoryKeys = new Set(attrs.factory.factoryKeys)
    const missing = surface.filter((name) => !factoryKeys.has(name))
    if (missing.length === 0) continue

    findings.push({
      kind: "missing-keys",
      file: fromRel,
      line: attrs.line,
      specifier: attrs.specifier,
      missing,
    })
  }

  findings.sort((a, b) => {
    if (a.file !== b.file) return a.file < b.file ? -1 : 1
    if (a.line !== b.line) return a.line - b.line
    const aLabel = findingSpecifierLabel(a)
    const bLabel = findingSpecifierLabel(b)
    if (aLabel !== bLabel) return aLabel < bLabel ? -1 : 1
    return 0
  })
  return findings
}

function topLevelGroup(filePath: string): string {
  const segs = filePath.split("/")
  if (segs[0] === "packages" && segs.length >= 3) return `${segs[0]}/${segs[1]}/${segs[2]}`
  return segs[0] ?? filePath
}

function formatViolation(v: MockModuleSurfaceFinding): string {
  const head = `${v.file}:${v.line}  ${findingSpecifierLabel(v)} —`
  if (v.kind === "unreadable-specifier") {
    return (
      `${head} specifier is not a string literal, so no module was named and the factory could` +
      ` not be judged. Write the specifier inline as a string literal, and give the factory an` +
      ` inline object literal carrying a key for every runtime named export of that module.`
    )
  }
  if (v.kind === "unanalyzable-factory") {
    if (v.expectedKeys === null) {
      return (
        `${head} ${v.reason}. Rewrite the factory as an inline object literal carrying a key for` +
        ` every runtime named export of ${v.specifier}.`
      )
    }
    if (v.expectedKeys.length === 0) {
      return (
        `${head} ${v.reason}. Rewrite the factory as an inline object literal; ${v.specifier} has` +
        ` no runtime named exports, so \`() => ({})\` clears it.`
      )
    }
    return (
      `${head} ${v.reason}. Rewrite the factory as an inline object literal with these keys:` +
      ` ${v.expectedKeys.join(", ")}.`
    )
  }
  return (
    `${head} missing keys: ${v.missing.join(", ")}. Add each as a property of the inline` +
    ` object-literal factory — a spread, a helper call or a computed key is refused rather than` +
    ` accepted as cover for them.`
  )
}

const FLAG_SPEC = {
  json: { kind: "boolean" },
  treeSha: { kind: "string", required: true },
} as const

async function main(): Promise<undefined> {
  let flags: { json: boolean; treeSha: string }
  try {
    const parsed = parseArgs(process.argv.slice(2), FLAG_SPEC, { passthrough: true })
    flags = { json: parsed.flags.json, treeSha: parsed.flags.treeSha }
  } catch (err) {
    exitOnToolError({ error: err, prefix: PREFIX })
  }

  const repoRoot = codeRoot()

  let graph: Graph
  try {
    graph = await buildFrom(readAt(flags.treeSha).ctx)
  } catch (err) {
    exitOnToolError({
      error: new Error(`failed to build the graph at ${flags.treeSha}: ${errorMessage(err)}`),
      prefix: PREFIX,
    })
  }

  const findings = findMockModuleSurfaceViolations(graph)

  const siteKey = (site: { file: string; line: number; specifier: string }): string =>
    `${site.file}:${site.line} ${site.specifier}`
  const readableSites = graph.edges({ type: [MOCK_MODULE_EDGE_TYPE] }).flatMap((edge) => {
    const file = tsFileNodeIdToCodeRepoRel(edge.from)
    if (file === null || !isTestFile(file) || isFixturePath(file)) return []
    const attrs = MockModuleAttrsSchema.parse(edge.attrs)
    return [{ file, line: attrs.line, specifier: attrs.specifier }]
  })
  const unreadableSites = graph
    .edges({ type: [MOCK_MODULE_UNREADABLE_SPECIFIER_EDGE_TYPE] })
    .flatMap((edge) => {
      const file = tsFileNodeIdToCodeRepoRel(edge.from)
      if (file === null || !isTestFile(file) || isFixturePath(file)) return []
      const attrs = MockModuleUnreadableSpecifierAttrsSchema.parse(edge.attrs)
      return [{ file, line: attrs.line, specifier: attrs.specifierText }]
    })
  const callSites = [...readableSites, ...unreadableSites]

  const findingSiteKey = (finding: MockModuleSurfaceFinding): string =>
    siteKey({ ...finding, specifier: findingSpecifierLabel(finding) })
  const findingsBySite = new Map<string, MockModuleSurfaceFinding[]>()
  for (const finding of findings) {
    const list = findingsBySite.get(findingSiteKey(finding)) ?? []
    list.push(finding)
    findingsBySite.set(findingSiteKey(finding), list)
  }

  const { population } = examinePopulation({
    members: callSites,
    unit: "mock.module call sites",
    membership: {
      kind: "atLeast",
      members: CALL_SITE_LEAST_COUNT,
      from: CALL_SITE_LEAST_COUNT_FROM,
    },
    labelOf: siteKey,
    siteOf: (site) => resolve(repoRoot, site.file),
    examine: (site) => findingsBySite.get(siteKey(site)) ?? [],
  })

  exitOnResult({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: `mock.module call sites that do not cover the mocked module's runtime exports — ${findings.length.toLocaleString()} finding(s) across ${new Set(findings.map((f) => f.file)).size.toLocaleString()} file(s)`,
      successMessage: "No mock.module surface violations detected.",
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
