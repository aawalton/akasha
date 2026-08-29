import { execFileSync } from "node:child_process"
import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "../checks-system/judging.module.code.ts"
import type { Value } from "../pages-system/indexes/index-entries.module.code.ts"
import { schemaIn } from "../pages-system/indexes/index-entries.module.code.ts"
import { id as idPage } from "../pages-system/page/properties/id.text-property.ts"
import { slug as slugPage } from "../pages-system/page/properties/slug.text-property.ts"
import { bytesOf } from "../testing-system/bodying.module.code.ts"
import { gitIn } from "../testing-system/gitting.module.code.ts"
import { scratchWorld } from "./scratching.module.code.ts"

export const MODULE_AT = new URL("./landing.module.code.ts", import.meta.url).pathname

export const scratch = scratchWorld()

export const git = gitIn

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

export const bytes = bytesOf

export function gitOver(root: string): readonly string[] {
  const said = execFileSync("ps", ["-eo", "args="], { encoding: "utf8" })
  return said.split("\n").filter((one) => one.includes("cat-file") && one.includes(root))
}

export const ID = "01a04e11-0000-7000-8000-000000000001"

export const A = `export const a = { id: "${ID}", pageTypeSlug: "domain", slug: "a" }\n`

export const TYPE =
  'export const domain = { id: "01a04e11-0000-7000-8000-000000000002",' +
  ' pageTypeSlug: "page-type", slug: "domain", extendsSlug: "page" }\n'

export const LINE = `{"path":"akasha/a.domain.ts","id":"${ID}"}`

export const indexIn = (root: string): string => join(root, ".git/data/index")

export const butTheStamp = (found: readonly string[]): readonly string[] =>
  found.filter((one) => !one.startsWith("/stamp.jsonl "))

export function declaring(root: string): void {
  const pages: readonly Value[] = [idPage, slugPage]
  for (const page of pages) {
    for (const one of schemaIn(page)) {
      const at = join(indexIn(root), one.at)
      mkdirSync(join(at, ".."), { recursive: true })
      writeFileSync(at, `${one.line}\n`)
    }
  }
}
