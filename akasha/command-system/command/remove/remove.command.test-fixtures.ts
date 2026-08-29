import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Given } from "../../calling.module.code.ts"
import { admitting } from "../../minting.module.code.ts"
import { scratchWorld } from "../../scratching.module.code.ts"

export const scratch = scratchWorld()

export function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

export function repoWith(named: Readonly<Record<string, string>>): string {
  const root = scratch.rootFor("akasha-remove-")
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
  return { root, calledAs: "akasha remove", from: root, writer: null, agentId: null }
}

export function naming(...paths: readonly string[]): readonly string[] {
  return paths.flatMap((one) => ["--file-path", one])
}

export function stands(root: string, path: string): boolean {
  return existsSync(join(root, path))
}

export function head(root: string): string {
  return git(root, ["rev-parse", "HEAD"]).trim()
}

export const HELD = "akasha/one/held.module.ts"

export const BESIDE = "akasha/one/held.module.code.ts"

export const KEPT = "akasha/two/kept.module.ts"

export const DEEP = "akasha/one/deep/held.module.ts"

export const BODY = `export const held = 1\n`
