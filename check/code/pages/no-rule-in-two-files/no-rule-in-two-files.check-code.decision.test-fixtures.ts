import type {
  Said,
  Saying,
} from "akasha/check/code/pages/no-rule-in-two-files/no-rule-in-two-files.check-code.decision.code.ts"
import { onDisk } from "akasha/check/modules/change-walking/change-walking.module.code.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  carrying,
  claiming,
  declaring,
  filing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { speltIn } from "akasha/code/reading/modules/code-rule/code-rule.module.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { astHashesIn } from "akasha/page/index/ast-hash/index-ast-hash.index.code.ts"
import { reconcile } from "akasha/page/index/modules/keeping/index-keeping.module.code.ts"
import { indexIn } from "akasha/page/index/modules/surface/index-surface.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

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
    for (const each of speltIn(one.path, one.text)) {
      const already = found.get(each.rule) ?? []
      found.set(each.rule, [...already, { path: one.path, name: each.name }])
    }
  }
  return (rule) => found.get(rule) ?? []
}

function hashing(root: string, held: readonly Held[]): undefined {
  const entries = held.flatMap((one) => astHashesIn(one.path, one.text, root))
  reconcile(entries, indexIn(root), true)
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
  claiming(root, "akasha/t/held.module.ts", `${ID}9`)
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

export function oneArriving(root: string): Change {
  writing(root, TWO_CODE, EXPORTED_AS)
  claiming(root, TWO_PAGE, `${ID}2`)
  hashing(root, [{ path: TWO_CODE, text: EXPORTED_AS }])
  const bodies: Record<string, Uint8Array> = {
    [ONE_PAGE]: bytesOf(pageText("one", "1")),
    [ONE_CODE]: bytesOf(CAMEL),
  }
  const disk = onDisk(root)
  return {
    root,
    changed: [ONE_PAGE, ONE_CODE],
    after: (path: string): Uint8Array | null => bodies[path] ?? disk(path),
    before: (path: string): Uint8Array | null => (path in bodies ? null : disk(path)),
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
    claiming(root, path, `${ID}${held}`)
    held += 1
  }
  hashing(
    root,
    Object.entries(files).map(([path, text]) => ({ path, text }))
  )
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  const added = ran(["git", "-C", root, "add", "-A"])
  if (added.code !== 0) throw new Error(`nothing was tracked at ${root} — ${added.err.trim()}`)
  return root
}
