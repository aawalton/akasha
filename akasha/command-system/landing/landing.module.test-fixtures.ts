import { mkdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import type { Judging } from "@akasha/checks-system/judging"
import { bodyOf, thePage } from "@akasha/indexes/indexing/testing"
import { id as idPage } from "@akasha/pages-system/page/id"
import { slug as slugPage } from "@akasha/pages-system/page/slug"
import type { Value } from "@akasha/pages-system/page-value"
import { textProperty } from "@akasha/pages-system/text-property"
import { bytesOf } from "@akasha/testing-system/bodying"
import { gitIn } from "@akasha/testing-system/gitting"
import { said as saying } from "@akasha/utils-run/running"
import { scratchWorld } from "../scratching/scratching.module.code.ts"
import type { FileEdit } from "./landing.module.code.ts"

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

export const ADMITS: Judging = { named: ["admits"], checksFor: () => ["admits"], over: () => [] }

export const REFUSES: Judging = {
  named: ["refuses"],
  checksFor: () => ["refuses"],
  over: (change) => change.changed.map((path) => ({ path, reason: "refused for the test" })),
}

export const bytes = bytesOf

export function gitOver(root: string): readonly string[] {
  const said = saying(["ps", "-eo", "args="])
  return said.split("\n").filter((one) => one.includes("cat-file") && one.includes(root))
}

export const ID = "01a04e11-0000-7000-8000-000000000001"

export const A = `export const a = { id: "${ID}", pageTypeSlug: "domain", slug: "a" }\n`

function typed(
  said: string,
  slug: string,
  above: string | null,
  declares: readonly string[] = []
): string {
  const properties = declares.map((one) => ({
    pagePropertySlug: one,
    required: false,
    many: false,
  }))
  const value = {
    id: `01a04e11-0000-7000-8000-0000000000${said}`,
    pageTypeSlug: "page-type",
    slug,
    extendsSlug: above,
    properties,
  }
  return `export const held = ${JSON.stringify(value)}\n`
}

export const TYPE = typed("02", "domain", "page-type/page")

const VOCABULARY: readonly (readonly [string, string])[] = [
  ["akasha/page.page-type.ts", typed("11", "page", null, ["id", "slug"])],
  ["akasha/page-type.page-type.ts", typed("12", "page-type", "page-type/page")],
  ["akasha/page-property.page-type.ts", typed("13", "page-property", "page-type/page")],
  ["akasha/domain.page-type.ts", TYPE],
]

export const LINE = `{"path":"akasha/a.domain.ts","id":"${ID}"}`

export const identityAmong = (found: readonly string[]): readonly string[] =>
  found.filter((one) => one.startsWith("/identity/"))

const REAL: readonly Value[] = [textProperty, idPage, slugPage]

export const CARRIED: readonly FileEdit[] = [
  ...VOCABULARY.map(([path, body]) => ({ path, body: bytesOf(body) })),
  ...REAL.map((page) => {
    const [at, value] = thePage(page)
    return { path: join("akasha", at), body: bytesOf(bodyOf(value)) }
  }),
]
