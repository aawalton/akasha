import { execFileSync } from "node:child_process"
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "../checks-system/judging.module.code.ts"
import { scratchWorld } from "./scratching.module.code.ts"

export const MODULE_AT = new URL("./landing.module.code.ts", import.meta.url).pathname

export const scratch = scratchWorld()

export function git(root: string, argv: readonly string[]): string {
  return execFileSync("git", ["-C", root, ...argv], { encoding: "utf8" })
}

export function repoWith(named: Readonly<Record<string, string | Uint8Array>>): string {
  const root = scratch.rootFor("akasha-landing-")
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
  return root
}

export const ADMITS: Judging = { named: ["admits"], over: () => [] }

export const REFUSES: Judging = {
  named: ["refuses"],
  over: (leaving) => leaving.changed.map((path) => ({ path, reason: "refused for the test" })),
}

export const bytes = (s: string): Uint8Array => new TextEncoder().encode(s)

export function gitOver(root: string): readonly string[] {
  const said = execFileSync("ps", ["-eo", "args="], { encoding: "utf8" })
  return said.split("\n").filter((one) => one.includes("cat-file") && one.includes(root))
}

export async function until(said: () => boolean, waited = 10000): Promise<boolean> {
  const end = Date.now() + waited
  while (Date.now() < end && !said()) await Bun.sleep(20)
  return said()
}

export const ID = "01a04e11-0000-7000-8000-000000000001"

export const A = `export const a = { id: "${ID}", pageTypeSlug: "domain", slug: "a" }\n`

export const TYPE =
  'export const domain = { id: "01a04e11-0000-7000-8000-000000000002",' +
  ' pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" }\n'

export const LINE = `{"path":"akasha/a.domain.ts","id":"${ID}"}`

export const indexIn = (root: string): string => join(root, ".git/data/index")

export function everyFileUnder(at: string): readonly string[] {
  const found: string[] = []
  const walk = (here: string): void => {
    for (const one of readdirSync(here, { withFileTypes: true })) {
      const next = join(here, one.name)
      if (one.isDirectory()) walk(next)
      else found.push(`${next.slice(at.length)} ${readFileSync(next, "utf8")}`)
    }
  }
  walk(at)
  return found.sort()
}

export const butTheStamp = (found: readonly string[]): readonly string[] =>
  found.filter((one) => !one.startsWith("/stamp.jsonl "))
