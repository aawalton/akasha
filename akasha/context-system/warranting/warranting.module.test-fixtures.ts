import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { rootOf } from "../../command-system/rooting/rooting.module.code.ts"
import { standing } from "../../command-system/scratching/scratching.module.test-fixtures.ts"
import { dataAt } from "../../file-system/data-place/data-place.module.code.ts"
import { standingFiled } from "../../pages-system/indexes/index-reading/index-reading.module.test-fixtures.ts"
import { exportedAs } from "../../pages-system/page/page-export-name/page-export-name.module.code.ts"
import { mintedId } from "../../testing-system/minting/minting.module.code.ts"
import { indexed } from "../warrant-scratch/warrant-scratch.module.code.ts"

const HERE = rootOf(import.meta.path)

const WARRANTS_IN = "akasha/context-system/context-warrant"

const WARRANTING_IN = "akasha/context-system/warranting"

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

export function warrantsStanding(root: string, slugs: readonly string[] = WARRANTS): undefined {
  mkdirSync(join(root, SEEDED_AT), { recursive: true })
  let minted = 0
  for (const slug of slugs) {
    minted = minted + 1
    const id = `01a04f58-0000-7000-8000-${String(minted).padStart(12, "0")}`
    const path = join(SEEDED_AT, `${slug}.context-warrant.ts`)
    writeFileSync(join(root, path), pageFor(slug, id))
    writeFileSync(join(root, `${path.slice(0, -".ts".length)}.code.ts`), codeFor(slug))
    standingFiled(root, CONTEXT_WARRANT, slug, [{ path, id }])
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
    `import { standingOf } from ${JSON.stringify(MODULE_AT)}`,
    "",
    `export function ${exportedAs(one.slug)}(root, path) {`,
    "  const oid = standingOf(root, path)",
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
    standing(root, at, one.page ?? statedPageFor(one, id))
    standing(root, `${at.slice(0, -".ts".length)}.code.ts`, one.code ?? statedCodeFor(one))
    standingFiled(root, CONTEXT_WARRANT, one.slug, [{ path: at, id }])
  }
}

export function seated(root: string, id: string, path: string): undefined {
  indexed(root, `identity/page/id/${id}.jsonl`, JSON.stringify({ path, id }))
}

export function subaged(root: string, slug: string, path: string): undefined {
  indexed(root, `identity/subagent/slug/${slug}.jsonl`, JSON.stringify({ path, id: "sub" }))
}
