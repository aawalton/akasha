import { speltIn } from "@akasha/code/code-rule"
import type { Change } from "@akasha/pages/change"
import { ran } from "@akasha/utils/run/running"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "../../../../commands/modules/scratching/scratching.module.code.ts"
import { writing } from "../../../../commands/modules/scratching/scratching.module.test-fixtures.ts"
import {
  carrying,
  claiming,
  declaring,
  filing,
} from "../../../modules/scratch/check-scratch.module.code.ts"
import type { Said } from "./no-rule-in-two-files.code-check.decision.code.ts"

export const CAMEL = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

export const EXPORTED_AS = `export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}
`

export const WIDEN = `function widen(one: string): string {
  return one.padEnd(80, " ")
}
`

export const ONE_PAGE = "akasha/b/one.module.ts"

export const ONE_CODE = "akasha/b/one.module.code.ts"

export const TWO_PAGE = "akasha/c/two.module.ts"

export const TWO_CODE = "akasha/c/two.module.code.ts"

export const scratch = scratchWorld()

const ID = "01a04d86-434f-75ff-8000-00000000000"

const KINDS = ["module", "page-type", "text-property", "file-property"]

type Held = {
  readonly path: string
  readonly text: string
}

export function byRule(held: readonly Held[]): ReadonlyMap<string, readonly Said[]> {
  const found = new Map<string, Said[]>()
  for (const one of held) {
    for (const each of speltIn(one.path, one.text)) {
      const already = found.get(each.rule) ?? []
      found.set(each.rule, [...already, { path: one.path, name: each.name }])
    }
  }
  return found
}

export function rooted(): string {
  const root = scratch.rootFor("akasha-two-files-")
  for (const one of KINDS) {
    filing(root, "page-type", one, `${ID}${one.length}`)
    carrying(root, one, ["code"])
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "page" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "within-page-type" })
  declaring(root, "code", { pageTypeSlug: "file-property", unique: null })
  claiming(root, "akasha/t/held.module.ts", "akasha/t/held.module.ts", `${ID}9`)
  return root
}

function pageText(slug: string, last: string): string {
  const held = `id: "${ID}${last}", slug: "${slug}", pageTypeSlug: "module", code: "ts"`
  return `export const it = { ${held} }\n`
}

export function bothArriving(root: string): Change {
  const bodies: Record<string, Uint8Array> = {
    [ONE_PAGE]: bytesOf(pageText("one", "1")),
    [ONE_CODE]: bytesOf(CAMEL),
    [TWO_PAGE]: bytesOf(pageText("two", "2")),
    [TWO_CODE]: bytesOf(EXPORTED_AS),
  }
  return {
    root,
    changed: [ONE_PAGE, ONE_CODE, TWO_PAGE, TWO_CODE],
    after: (path: string): Uint8Array | null => bodies[path] ?? null,
    before: (): null => null,
  }
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted()
  let held = 0
  for (const [path, body] of Object.entries(files)) {
    writing(root, path, body)
    claiming(root, path, path, `${ID}${held}`)
    held += 1
  }
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
