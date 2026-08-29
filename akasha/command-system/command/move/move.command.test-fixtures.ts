import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { stampKept } from "../../../pages-system/indexes/index-stamp.module.code.ts"
import { admitting } from "../../../testing-system/minting.module.code.ts"
import type { Given } from "../../calling.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"
import { IMPORTS_AT, PATHS_AT } from "./move.command.code.ts"

export const HELD = "akasha/one/held.module.ts"

export const THREE = "akasha/three/held.module.ts"

export const DEEP = "akasha/one/deep/held.module.ts"

export const PAIR = ["--from", HELD, "--to", THREE]

export const PAGE = `export const held = {
  id: "01a04bed-1450-7000-8000-00000000aaaa",
  pageTypeSlug: "module",
  slug: "held",
  definition: "a page carried across a move",
}
`

export const CODE = `import ts from "typescript"
import { other } from "../two/other.module.code.ts"

export const held = { ts, other }
`

export const OTHER = `export const other = 1\n`

export const HOLDER = "akasha/one/held.module.code.ts"

export const TARGET = "akasha/two/other.module.code.ts"

export const ARRIVES = "akasha/four/other.module.code.ts"

export const DEEPER = "akasha/one/deep/held.module.code.ts"

export const NAMER = "akasha/five/namer.module.code.ts"

export const SPELLS = `export const at = "akasha/two/other.module.code.ts"\n`

export const AAAA = "01a04bed-1450-7000-8000-00000000aaaa"

export const RENAME = ["--from", HELD, "--to", "akasha/one/other.module.ts"]

export const READER = "akasha/elsewhere/reader.module.ts"

export const scratch = scratchWorld()

export function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

export function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-move-")
  git(root, ["init", "--quiet"])
  git(root, ["config", "user.email", "held@nowhere"])
  git(root, ["config", "user.name", "Held"])
  for (const [path, body] of Object.entries(named)) {
    const at = join(root, path)
    mkdirSync(join(at, ".."), { recursive: true })
    writeFileSync(at, body)
  }
  git(root, ["add", "-A"])
  git(root, ["commit", "--quiet", "-m", "first"])
  writeFileSync(join(root, ".git/info/exclude"), "akasha/admits.check*\n")
  admitting(root)
  return root
}

export function givenIn(root: string): Given {
  return { root, calledAs: "akasha move", from: root, writer: null, agentId: null }
}

export function stands(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

export function head(root: string): string {
  return git(root, ["rev-parse", "HEAD"]).trim()
}

export function importing(root: string, target: string, importers: readonly string[]): void {
  const at = join(root, IMPORTS_AT, `${target}.jsonl`)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, importers.map((path) => `${JSON.stringify({ path })}\n`).join(""))
  stampKept(join(root, ".git/data/index"), { commit: head(root), tree: "akasha", settled: [] })
}

export function claiming(root: string, path: string, ids: readonly string[]): void {
  const at = join(root, PATHS_AT, `${path}.jsonl`)
  mkdirSync(join(at, ".."), { recursive: true })
  writeFileSync(at, ids.map((id) => `${JSON.stringify({ path, id })}\n`).join(""))
}

export function naming(root: string, id: string): void {
  const at = join(root, ".git/data/index/relation/page/id", id, "required-reading-slugs")
  mkdirSync(at, { recursive: true })
  writeFileSync(join(at, `${AAAA}.jsonl`), `${JSON.stringify({ path: READER })}\n`)
}
