import type { Saying } from "akasha/checks/code-checks/pages/no-rule-in-two-files/no-rule-in-two-files.code-check.decision.code.ts"
import {
  carrying,
  claiming,
  declaring,
  filing,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { speltIn } from "akasha/code/rule/code-rule.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import { entriesFiled } from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { readerIn, type Said } from "akasha/pages/indexes/rule/index-rule.index.code.ts"
import { bytesOf } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"
import { ran } from "akasha/utils/run/running/running.module.code.ts"

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

export function byRule(held: readonly Held[]): Saying {
  const found = new Map<string, Said[]>()
  for (const one of held) {
    for (const [place, each] of speltIn(one.path, one.text).entries()) {
      const already = found.get(each.rule) ?? []
      found.set(each.rule, [...already, { path: one.path, place, name: each.name }])
    }
  }
  return (rule) => found.get(rule) ?? []
}

export function readerFiledIn(root: string): string {
  entriesFiled(root, [readerIn()])
  return root
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

export function pageText(slug: string, last: string): string {
  const held = `id: "${ID}${last}", slug: "${slug}", pageTypeSlug: "module", code: "ts"`
  return `export const it = { ${held} }\n`
}

const HOME_PAGE = "akasha/d/home.module.ts"

const HOME_CODE = "akasha/d/home.module.code.ts"

const NOTHING = "export const nothing = 1\n"

export function bothLeaving(root: string): Change {
  const bodies: Record<string, Uint8Array> = {
    [ONE_CODE]: bytesOf(NOTHING),
    [TWO_CODE]: bytesOf(NOTHING),
    [HOME_PAGE]: bytesOf(pageText("home", "3")),
    [HOME_CODE]: bytesOf(CAMEL),
  }
  const was: Record<string, Uint8Array> = {
    [ONE_CODE]: bytesOf(CAMEL),
    [TWO_CODE]: bytesOf(EXPORTED_AS),
  }
  return {
    root,
    changed: [ONE_CODE, TWO_CODE, HOME_PAGE, HOME_CODE],
    after: (path: string): Uint8Array | null => bodies[path] ?? null,
    before: (path: string): Uint8Array | null => was[path] ?? null,
  }
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

const ONE_MARKDOWN = "akasha/b/one.md"

export function unindexed(): Change {
  const body = bytesOf("# one\n")
  return {
    root: scratch.rootFor("akasha-two-files-unindexed-"),
    changed: [ONE_MARKDOWN],
    after: (path: string): Uint8Array | null => (path === ONE_MARKDOWN ? body : null),
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
