import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "@akasha/command-system/scratching"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import {
  carrying,
  claiming,
  declaring,
  filing,
} from "../../../modules/check-scratch/check-scratch.module.code.ts"
import {
  everyShapeIn,
  noSecondSpellingOfANameFormat,
  reasonsIn,
  shapesIn,
} from "./no-second-spelling-of-a-name-format.code-check.code.ts"

const SHAPE = "^[a-z0-9]+(-[a-z0-9]+)*$"

const KEBAB_CODE = "akasha/f/kebab.name-format.code.ts"

const DASH_CODE = "akasha/f/dash.name-format.code.ts"

const OTHER_CODE = "akasha/m/other.module.code.ts"

const STATING = `export const kebab = matching(/${SHAPE}/)\n`

const SPELLING = `const SLUG = /${SHAPE}/\n`

const STATED: ReadonlyMap<string, readonly string[]> = new Map([[SHAPE, [KEBAB_CODE]]])

test("a shape a name format states, spelled in another file, is refused", () => {
  const said = reasonsIn(OTHER_CODE, SPELLING, STATED)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain(KEBAB_CODE)
  expect(said[0]).toContain("line 1")
  expect(said[0]).toContain("belongs to its own page")
})

test("a name format spelling its own shape is passed over", () => {
  expect(reasonsIn(KEBAB_CODE, STATING, STATED)).toEqual([])
})

test("two name formats stating one shape refuse neither, that being another matter", () => {
  const both: ReadonlyMap<string, readonly string[]> = new Map([[SHAPE, [KEBAB_CODE, DASH_CODE]]])
  expect(reasonsIn(KEBAB_CODE, STATING, both)).toEqual([])
  expect(reasonsIn(DASH_CODE, STATING, both)).toEqual([])
})

test("a shape no name format states is passed over", () => {
  expect(reasonsIn(OTHER_CODE, "const ONE = /^[0-9]+$/\n", STATED)).toEqual([])
})

test("the flags a regex carries are no part of its shape", () => {
  expect(reasonsIn(OTHER_CODE, `const SLUG = /${SHAPE}/u\n`, STATED)).toHaveLength(1)
})

test("a shape written in a string is no regex literal and says nothing", () => {
  expect(reasonsIn(OTHER_CODE, `const SLUG = "/${SHAPE}/"\n`, STATED)).toEqual([])
})

test("a shape handed straight to a call is seen, standing wherever it is written", () => {
  expect(reasonsIn(OTHER_CODE, `export const held = matching(/${SHAPE}/)\n`, STATED)).toHaveLength(
    1
  )
})

test("the line a shape stands on is the line the refusal names", () => {
  const said = reasonsIn(OTHER_CODE, `const ONE = 1\nconst SLUG = /${SHAPE}/\n`, STATED)
  expect(said[0]).toContain("line 2")
})

test("every regex literal a body holds is read, each with the line it stands on", () => {
  expect(shapesIn(OTHER_CODE, "const A = /a/\nconst B = /b/g\n")).toEqual([
    { shape: "a", line: 1 },
    { shape: "b", line: 2 },
  ])
})

const ID = "01a05941-9823-7000-aff4-00000000000"

const KINDS = ["module", "page-type", "text-property", "file-property", "name-format"]

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rooted(): string {
  const root = scratch.rootFor("akasha-second-spelling-")
  for (const [at, one] of KINDS.entries()) {
    filing(root, "page-type", one, `${ID}${at}`)
    carrying(root, one, ["code"])
  }
  declaring(root, "id", { pageTypeSlug: "text-property", unique: "always" })
  declaring(root, "slug", { pageTypeSlug: "text-property", unique: "within-page-type" })
  declaring(root, "code", { pageTypeSlug: "file-property", unique: null })
  claiming(root, "akasha/t/standing.module.ts", "akasha/t/standing.module.ts", `${ID}9`)
  return root
}

const KEBAB_PAGE = "akasha/f/kebab.name-format.ts"

const OTHER_PAGE = "akasha/m/other.module.ts"

function pageBody(slug: string, kind: string, last: string): Uint8Array {
  return new TextEncoder().encode(
    `export const it = { id: "${ID}${last}", slug: "${slug}", pageTypeSlug: "${kind}", code: "ts" }\n`
  )
}

function bothArriving(root: string): Change {
  const bodies: Record<string, Uint8Array> = {
    [KEBAB_PAGE]: pageBody("kebab", "name-format", "5"),
    [KEBAB_CODE]: new TextEncoder().encode(STATING),
    [OTHER_PAGE]: pageBody("other", "module", "6"),
    [OTHER_CODE]: new TextEncoder().encode(SPELLING),
  }
  return {
    root,
    changed: [KEBAB_PAGE, KEBAB_CODE, OTHER_PAGE, OTHER_CODE],
    after: (path: string): Uint8Array | null => bodies[path] ?? null,
    before: (): null => null,
  }
}

test("a name format arriving in a change states its shape to the check", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect([...(everyShapeIn(change, cast.shadow).get(SHAPE) ?? [])]).toEqual([KEBAB_CODE])
})

test("a module spelling a format's shape is refused, and the format stating it is not", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const said = noSecondSpellingOfANameFormat(change, cast.shadow)
  expect(said.map((one) => one.path)).toEqual([OTHER_CODE])
  expect(said[0]?.reason).toContain(KEBAB_CODE)
})
