#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { parseArgs, STANDARD_FLAGS } from "../lib/cli-args"
import { errorMessage } from "../../../../../instructions/tools/lib/check-workflow/error-message"
import { examineFilePopulation, type Population } from "../../../../../instructions/tools/lib/check-workflow/population"
import { getRepoRoot } from "../lib/repo-root"
import { listTsFiles } from "../lib/ts-file-iteration"
import { exitOnResult } from "../../../../../instructions/tools/lib/check-workflow/violation-reporter"

const PREFIX = "[node-type-registry-sync]"

const DSL_TYPES_PATH = "packages/infra/workflow-dsl/src/dsl/types.ts"

const INLINE_LITERAL_PRODUCERS: ReadonlyMap<string, { readonly emitFile: string }> = new Map([
  [
    "installed-package",
    {
      emitFile:
        "packages/shared/graph/producers/src/installed-package/installed-package.node.producer.ts",
    },
  ],
])

const PRODUCER_CONST_RE =
  /^export\s+const\s+([A-Z][A-Z0-9_]*_NODE_TYPE)\s*(?::\s*[A-Za-z0-9_]+)?\s*=\s*"([a-z][a-z0-9-]*)"/gm

const DSL_BLOCK_START_RE = /^export\s+type\s+NodeType\s*=/m
const DSL_LITERAL_RE = /"([a-z][a-z0-9-]*)"/g

interface ProducerEntry {
  readonly constName: string
  readonly value: string
  readonly file: string
}

interface SyncFinding {
  readonly kind: "MissingFromDsl" | "OrphanInDsl"
  readonly value: string
  readonly message: string
}

function scanProducerEntries(file: string, source: string): readonly ProducerEntry[] {
  const entries: ProducerEntry[] = []
  const matches = source.matchAll(PRODUCER_CONST_RE)
  for (const m of matches) {
    const constName = m[1]
    const value = m[2]
    if (constName === undefined || value === undefined) continue
    entries.push({ constName, value, file })
  }
  return entries
}

function scanDslUnion(repoRoot: string): readonly string[] {
  const path = `${repoRoot}/${DSL_TYPES_PATH}`
  if (!existsSync(path)) {
    throw new Error(`DSL types file not found at ${path}`)
  }
  const source = readFileSync(path, "utf-8")
  const blockStart = source.search(DSL_BLOCK_START_RE)
  if (blockStart === -1) {
    throw new Error(`Could not find 'export type NodeType =' block in ${DSL_TYPES_PATH}`)
  }
  const tail = source.slice(blockStart)
  const endRel = tail.search(/\n\n|\nexport\s+(?:const|interface|type|function|class)\s/)
  const block = endRel === -1 ? tail : tail.slice(0, endRel)
  const literals = new Set<string>()
  for (const m of block.matchAll(DSL_LITERAL_RE)) {
    const value = m[1]
    if (value !== undefined) literals.add(value)
  }
  return [...literals].sort()
}

function verifyInlineLiteralProducers(repoRoot: string): readonly SyncFinding[] {
  const findings: SyncFinding[] = []
  for (const [value, info] of INLINE_LITERAL_PRODUCERS) {
    const path = `${repoRoot}/${info.emitFile}`
    if (!existsSync(path)) {
      findings.push({
        kind: "OrphanInDsl",
        value,
        message: `INLINE_LITERAL_PRODUCERS allowlist entry "${value}" → emit file ${info.emitFile} does not exist; either re-add the producer or drop the entry from check-node-type-registry-sync.ts`,
      })
      continue
    }
    const source = readFileSync(path, "utf-8")
    if (!source.includes(`"${value}"`)) {
      findings.push({
        kind: "OrphanInDsl",
        value,
        message: `INLINE_LITERAL_PRODUCERS allowlist entry "${value}" → emit file ${info.emitFile} does not contain the literal "${value}"; the producer was renamed or refactored — update the allowlist`,
      })
    }
  }
  return findings
}

function findSyncFindings(
  producerEntries: readonly ProducerEntry[],
  dslLiterals: readonly string[]
): readonly SyncFinding[] {
  const producerValues = new Set([
    ...producerEntries.map((e) => e.value),
    ...INLINE_LITERAL_PRODUCERS.keys(),
  ])
  const dslSet = new Set(dslLiterals)

  const findings: SyncFinding[] = []

  for (const entry of producerEntries) {
    if (dslSet.has(entry.value)) continue
    findings.push({
      kind: "MissingFromDsl",
      value: entry.value,
      message: `Producer ${entry.constName} = "${entry.value}" (${entry.file}) is not in the DSL NodeType union → add "${entry.value}" to packages/infra/workflow-dsl/src/dsl/types.ts`,
    })
  }
  for (const [value, info] of INLINE_LITERAL_PRODUCERS) {
    if (dslSet.has(value)) continue
    findings.push({
      kind: "MissingFromDsl",
      value,
      message: `Inline-literal producer "${value}" (${info.emitFile}) is not in the DSL NodeType union → add "${value}" to packages/infra/workflow-dsl/src/dsl/types.ts`,
    })
  }

  for (const literal of dslLiterals) {
    if (producerValues.has(literal)) continue
    findings.push({
      kind: "OrphanInDsl",
      value: literal,
      message: `DSL NodeType literal "${literal}" has no backing producer (no *_NODE_TYPE constant in the TS/TSX node population, no INLINE_LITERAL_PRODUCERS entry) → if the producer is gone, remove "${literal}" from packages/infra/workflow-dsl/src/dsl/types.ts; if a producer for it EXISTS but sits outside that population (a __fixtures__ directory, a .d.ts or .generated.ts, or a .ts outside packages/), widen the population in ../lib/ts-file-iteration.ts rather than deleting the literal, which is correctly there`,
    })
  }

  return findings
}

interface CliFlags {
  json: boolean
  repoRoot: string
  treeSha: string | undefined
  cacheDir: string | undefined
}

function readFlags(): CliFlags {
  const parsed = parseArgs(
    process.argv.slice(2),
    { ...STANDARD_FLAGS, treeSha: { kind: "string" }, cacheDir: { kind: "string" } },
    { passthrough: true }
  )
  return {
    json: parsed.flags.json,
    repoRoot: parsed.flags.repoRoot != null ? resolve(parsed.flags.repoRoot) : getRepoRoot(),
    treeSha: parsed.flags.treeSha,
    cacheDir: parsed.flags.cacheDir,
  }
}

async function main(): Promise<undefined> {
  let flags: CliFlags
  try {
    flags = readFlags()
  } catch (err) {
    process.stderr.write(`${PREFIX} ${errorMessage(err)}\n`)
    process.exit(2)
  }

  if (!existsSync(flags.repoRoot)) {
    process.stderr.write(`${PREFIX} --repo-root ${flags.repoRoot} does not exist\n`)
    process.exit(2)
  }

  let findings: readonly SyncFinding[]
  let population: Population
  try {
    const files = await listTsFiles({
      repoRoot: flags.repoRoot,
      treeSha: flags.treeSha,
      cacheDir: flags.cacheDir,
    })
    const examined = examineFilePopulation<ProducerEntry>({
      files,
      unit: "source files",
      membership: {
        kind: "enumerated",
        because:
          "`listTsFiles` reads its members off `graph.nodes(TS_FILE_NODE_TYPES)` on a graph it awaits, " +
          "and a build that fails rejects that promise rather than handing back a partial one, so fewer " +
          "members means fewer TS files on disk",
      },
      pathOf: (file) => `${flags.repoRoot}/${file}`,
      scan: scanProducerEntries,
    })
    population = examined.population
    const producerEntries = examined.violations
    if (producerEntries.length === 0) {
      process.stderr.write(
        `${PREFIX} no *_NODE_TYPE constants found across ${files.length} TS/TSX source files — the producer-side pattern or the population has stopped matching\n`
      )
      process.exit(2)
    }
    const dslLiterals = scanDslUnion(flags.repoRoot)
    findings = [
      ...findSyncFindings(producerEntries, dslLiterals),
      ...verifyInlineLiteralProducers(flags.repoRoot),
    ]
  } catch (err) {
    process.stderr.write(`${PREFIX} ${errorMessage(err)}\n`)
    process.exit(2)
  }

  exitOnResult<SyncFinding>({
    violations: findings,
    options: {
      population,
      format: flags.json ? "json" : "human",
      prefix: PREFIX,
      header: "Producer-side *_NODE_TYPE constants and DSL NodeType union are out of sync",
      successMessage: "DSL NodeType union covers every producer-side *_NODE_TYPE value.",
      groupBy: (v) => v.kind,
      formatViolation: (v) => v.message,
    },
  })
}

main().catch((err) => {
  process.stderr.write(`${PREFIX} Unexpected error: ${errorMessage(err)}\n`)
  process.exit(2)
})
