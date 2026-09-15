import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  carrying,
  claiming,
  declaring,
  filing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { ran } from "akasha/code/spawning/modules/running/running.module.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { listedFiled } from "akasha/page/index/modules/filing/index-filing.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

export const SHAPE = "^[a-z0-9]+(-[a-z0-9]+)*$"

const KEBAB_PAGE = "akasha/f/kebab.name-format.ts"

export const KEBAB_CODE = "akasha/f/kebab.name-format.code.ts"

export const DASH_CODE = "akasha/f/dash.name-format.code.ts"

const OTHER_PAGE = "akasha/m/other.module.ts"

export const OTHER_CODE = "akasha/m/other.module.code.ts"

export const STATING = `export const kebab = matching(/${SHAPE}/)\n`

export const SPELLING = `const SLUG = /${SHAPE}/\n`

export const STATED: ReadonlyMap<string, readonly string[]> = new Map([[SHAPE, [KEBAB_CODE]]])

export const scratch = scratchWorld()

const ID = "01a05941-9823-7000-aff4-00000000000"

const KINDS = ["module", "page-type", "text-property", "file-property", "name-format"]

export function rooted(): string {
  const root = scratch.rootFor("akasha-second-spelling-")
  for (const [at, one] of KINDS.entries()) {
    filing(root, "page-type", one, `${ID}${at}`)
    carrying(root, one, ["code"])
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "page" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "within-page-type" })
  declaring(root, "code", { pageTypeSlug: "file-property", unique: null })
  claiming(root, "akasha/t/held.module.ts", `${ID}9`)
  return root
}

function pageText(slug: string, kind: string, last: string): string {
  const held = `id: "${ID}${last}", slug: "${slug}", pageTypeSlug: "${kind}", code: "ts"`
  return `export const it = { ${held} }\n`
}

export function bothArriving(root: string): Change {
  const bodies: Record<string, Uint8Array> = {
    [KEBAB_PAGE]: bytesOf(pageText("kebab", "name-format", "5")),
    [KEBAB_CODE]: bytesOf(STATING),
    [OTHER_PAGE]: bytesOf(pageText("other", "module", "6")),
    [OTHER_CODE]: bytesOf(SPELLING),
  }
  return {
    root,
    changed: [KEBAB_PAGE, KEBAB_CODE, OTHER_PAGE, OTHER_CODE],
    after: (path: string): Uint8Array | null => bodies[path] ?? null,
    before: (): null => null,
  }
}

export function filed(root: string): string {
  writing(root, KEBAB_CODE, STATING)
  listedFiled(root, "name-format", "kebab", [{ path: KEBAB_PAGE, id: `${ID}5` }])
  return root
}

export function tracked(files: Readonly<Record<string, string>>): string {
  const root = rooted()
  let held = 5
  for (const [path, body] of Object.entries(files)) {
    writing(root, path, body)
    claiming(root, path, `${ID}${held}`)
    held += 1
  }
  const done = ran(["git", "-C", root, "init", "-q"])
  if (done.code !== 0) throw new Error(`no tree was made at ${root} — ${done.err.trim()}`)
  return root
}
