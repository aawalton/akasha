import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { recordRead } from "@akasha/command-system/reading"
import { rootOf } from "@akasha/command-system/rooting"
import { writing } from "@akasha/command-system/scratching/testing"
import { dataAt } from "@akasha/file-system/data-place"
import { listedFiled } from "@akasha/indexes/testing"
import { exportedAs } from "@akasha/pages-system/page-export-name"
import { mintedId } from "@akasha/testing-system/minting"

const HERE = rootOf(import.meta.path)

const WARRANTS_IN = "context-system/context-warrants"

const WARRANTING_IN = "context-system/warranting"

const CONTEXT_WARRANT = "context-warrant"

export const SEEDED_AT = dataAt("warrant")

const MINTED = "a warrant seeded for a test"

export const WARRANTS: readonly string[] = ["file-itself", "file-page-type"]

function realAt(slug: string): string {
  return join(HERE, WARRANTS_IN, slug, `${slug}.context-warrant.code.ts`)
}

function pageFor(slug: string, id: string): string {
  return [
    `export const ${exportedAs(slug)} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "context-warrant",`,
    `  slug: "${slug}",`,
    `  definition: "${MINTED}",`,
    `  code: "ts",`,
    `  test: "ts",`,
    `  runsOnRead: true,`,
    `  runsOnWrite: true,`,
    `  transitive: false,`,
    `}`,
    "",
  ].join("\n")
}

function codeFor(slug: string): string {
  const named = exportedAs(slug)
  return `export { ${named} } from ${JSON.stringify(realAt(slug))}\n`
}

export function warrantsSeeded(root: string, slugs: readonly string[] = WARRANTS): undefined {
  mkdirSync(join(root, SEEDED_AT), { recursive: true })
  let minted = 0
  for (const slug of slugs) {
    minted = minted + 1
    const id = `01a04f58-0000-7000-8000-${String(minted).padStart(12, "0")}`
    const path = join(SEEDED_AT, `${slug}.context-warrant.ts`)
    writeFileSync(join(root, path), pageFor(slug, id))
    writeFileSync(join(root, `${path.slice(0, -".ts".length)}.code.ts`), codeFor(slug))
    listedFiled(root, CONTEXT_WARRANT, slug, [{ path, id }])
  }
}

export type Said = {
  readonly slug: string
  readonly runsOnRead?: boolean
  readonly runsOnWrite?: boolean
  readonly transitive?: boolean
  readonly page?: string
  readonly code?: string
}

export const OWED = "a reading this test says is owed"

export const SEAT_AT = "akasha/seat-system/seat/seats/one.seat.ts"

export const SUB_AT = "akasha/seat-system/subagent/subagents/one-suba.subagent.ts"

export const AGENT = "01a04ee0-3078-7000-9069-e5db5da797ad"

export const OTHER = "01a04ee0-3078-7000-9069-000000000000"

export const PATH = "akasha/thing/thing.module.ts"

export const A = "akasha/one/a.ts"

export const B = "akasha/one/b.ts"

export const X = "akasha/one/x.ts"

export const Y = "akasha/one/y.ts"

export const TERM_AT = "akasha/one/word.taboo-term.ts"

export const DECIDING =
  "NAMING DECISION — not a reading to clear, and it may mean renaming what your change writes."

export const NOT_READ = " — the record does not show you read this."

const MODULE_AT = join(HERE, WARRANTING_IN, "warranting.module.code.ts")

function statedPageFor(one: Said, id: string): string {
  return [
    `export const ${exportedAs(one.slug)} = {`,
    `  id: "${id}",`,
    `  pageTypeSlug: "context-warrant",`,
    `  slug: "${one.slug}",`,
    `  code: "ts",`,
    `  test: "ts",`,
    `  runsOnRead: ${one.runsOnRead ?? true},`,
    `  runsOnWrite: ${one.runsOnWrite ?? true},`,
    `  transitive: ${one.transitive ?? false},`,
    `}`,
    "",
  ].join("\n")
}

export function chainOf(said: Record<string, readonly string[]>): string {
  return [
    "export function chain(root, path) {",
    `  const said = ${JSON.stringify(said)}`,
    '  return (said[path] ?? []).map((one) => ({ path: one, oid: "oid", owed: "owed" }))',
    "}",
    "",
  ].join("\n")
}

function statedCodeFor(one: Said): string {
  return [
    `import { blobAt } from ${JSON.stringify(MODULE_AT)}`,
    "",
    `export function ${exportedAs(one.slug)}(root, path) {`,
    "  const oid = blobAt(root, path)",
    `  return oid === null ? [] : [{ path, oid, owed: ${JSON.stringify(OWED)} }]`,
    "}",
    "",
  ].join("\n")
}

export function warrantingStated(root: string, every: readonly Said[]): undefined {
  mkdirSync(join(root, SEEDED_AT), { recursive: true })
  for (const one of every) {
    const id = mintedId(one.slug)
    const at = join(SEEDED_AT, `${one.slug}.context-warrant.ts`)
    writing(root, at, one.page ?? statedPageFor(one, id))
    writing(root, `${at.slice(0, -".ts".length)}.code.ts`, one.code ?? statedCodeFor(one))
    listedFiled(root, CONTEXT_WARRANT, one.slug, [{ path: at, id }])
  }
}

export function readAt(
  root: string,
  agentId: string,
  path: string,
  oid: string,
  was: string | null = null,
  reach: number | null = null
): undefined {
  recordRead(root, agentId, { path, oid, seenAt: 1, mechanicalOid: was, readThrough: reach })
}

export function subaged(root: string, slug: string, path: string): undefined {
  listedFiled(root, "subagent", slug, [{ path, id: "sub" }])
}
