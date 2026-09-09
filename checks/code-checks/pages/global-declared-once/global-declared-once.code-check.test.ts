import { afterAll, expect, test } from "bun:test"
import {
  listedFiled,
  pageFiled,
  pathFiled,
  relationFiled,
  schemaFiled,
  valueAlsoFiled,
} from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages/change"
import { type Shadow, shadowFor } from "@akasha/pages/shadow"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change, scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import {
  globalDeclaredOnce,
  keyOf,
  mergedBy,
  readingIn,
  statedIn,
} from "./global-declared-once.code-check.code.ts"

afterAll(scratch.sweep)

const HERE = "akasha/"

const SHARED_AT = "akasha/shared.type-declaration.d.ts"

const OTHER_AT = "akasha/other.type-declaration.d.ts"

const MODULE_AT = "akasha/one.module.code.ts"

const SHARED_ID = "01a06110-0000-7000-8000-00000000e001"

const MODULE_ID = "01a06110-0000-7000-8000-00000000e002"

const OTHER_ID = "01a06110-0000-7000-8000-00000000e003"

const HOLDS_VALUE = "declare const HELD: number\n"

const HOLDS_TYPE = "interface Held {\n  one: number\n}\n"

const HOLDS_MEMBER = "interface Held {\n  two: string\n}\n"

const HOLDS_ALIAS = "type HELD = string\n"

const APART = "declare const OTHER: string\n"

const AMBIENT = "ambient-types"

const DECLARES = "page-property"

const FILE_PROPERTY = "file-property"

const PAGE_TYPE = "page-type"

const DECLARER = "type-declaration"

const AMBIENT_AT = "akasha/ambient-types.file-property.ts"

const DECLARER_AT = "akasha/type-declaration.page-type.ts"

const SHARED_PAGE_AT = "akasha/shared.type-declaration.ts"

const APART_AT = "akasha/apart.type-declaration.d.ts"

const AMBIENT_ID = "01a06110-0000-7000-8000-00000000e004"

const DECLARER_ID = "01a06110-0000-7000-8000-00000000e005"

const SHARED_PAGE_ID = "01a06110-0000-7000-8000-00000000e006"

const APART_ID = "01a06110-0000-7000-8000-00000000e007"

function globally(body: string): string {
  return `export const away = 1\n\ndeclare global {\n${body}}\n`
}

function indented(body: string): string {
  return body.replace(/^(?=.)/gm, "  ")
}

function staging(shared: string, held: string): string {
  const root = staged({ [SHARED_AT]: shared, [MODULE_AT]: held })
  pathFiled(root, SHARED_AT, [{ path: SHARED_AT, id: SHARED_ID }])
  pathFiled(root, MODULE_AT, [{ path: MODULE_AT, id: MODULE_ID }])
  return root
}

function sharing(first: string, second: string): string {
  const root = staged({ [OTHER_AT]: first, [SHARED_AT]: second })
  pathFiled(root, OTHER_AT, [{ path: OTHER_AT, id: OTHER_ID }])
  pathFiled(root, SHARED_AT, [{ path: SHARED_AT, id: SHARED_ID }])
  return root
}

function ambient(root: string): undefined {
  schemaFiled(root, FILE_PROPERTY, AMBIENT, [
    {
      pageTypeSlug: FILE_PROPERTY,
      targetPageTypeSlug: null,
      unique: null,
      slug: AMBIENT,
      propertySlug: "d",
      fileName: null,
    },
  ])
  listedFiled(root, FILE_PROPERTY, AMBIENT, [{ path: AMBIENT_AT, id: AMBIENT_ID }])
  pageFiled(root, AMBIENT_ID, AMBIENT_AT)
  listedFiled(root, PAGE_TYPE, DECLARER, [{ path: DECLARER_AT, id: DECLARER_ID }])
  pageFiled(root, DECLARER_ID, DECLARER_AT)
  relationFiled(root, AMBIENT_ID, DECLARES, DECLARER_ID, [{ path: DECLARER_AT }])
  valueAlsoFiled(root, DECLARER, [
    { path: SHARED_PAGE_AT, value: { id: SHARED_PAGE_ID, pageTypeSlug: DECLARER, slug: "shared" } },
  ])
}

function naming(shared: string, held: string): string {
  const root = staged({ [SHARED_AT]: shared, [MODULE_AT]: held, [APART_AT]: APART })
  pathFiled(root, SHARED_AT, [{ path: SHARED_AT, id: SHARED_ID }])
  pathFiled(root, MODULE_AT, [{ path: MODULE_AT, id: MODULE_ID }])
  pathFiled(root, APART_AT, [{ path: APART_AT, id: APART_ID }])
  ambient(root)
  return root
}

function shadowed(given: Change): Shadow {
  const cast = shadowFor(given)
  if ("refused" in cast) throw new Error(cast.refused)
  return cast.shadow
}

function reached(given: Change): readonly string[] {
  return readingIn(given, shadowed(given)).filter((one) => one.startsWith(HERE))
}

function judged(given: Change): readonly Judged[] {
  return globalDeclaredOnce(given, shadowed(given))
}

function over(shared: string, inside: string): readonly Judged[] {
  const held = globally(indented(inside))
  return judged(change(staging(shared, held), { [MODULE_AT]: held }))
}

function across(first: string, second: string): readonly Judged[] {
  return judged(change(sharing(first, second), { [SHARED_AT]: second }))
}

function reasoned(said: readonly Judged[]): string {
  return said.map((each) => `${each.path} ${each.reason}`).join("\n")
}

test("a module declaring a global the shared set does not declare is refused nothing", () => {
  expect(over(APART, HOLDS_VALUE)).toEqual([])
})

test("a value name a module and the shared set both declare is refused", () => {
  const said = over(HOLDS_VALUE, HOLDS_VALUE)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(MODULE_AT)
  expect(said[0]?.reason).toContain("`HELD` is declared at")
})

test("the refusal for a value name says a redeclaration stops being typechecked", () => {
  expect(reasoned(over(HOLDS_VALUE, HOLDS_VALUE))).toContain("stops being typechecked")
})

test("the refusal names the shared file the name is declared in too", () => {
  expect(reasoned(over(HOLDS_VALUE, HOLDS_VALUE))).toContain(SHARED_AT)
})

test("an interface a module and the shared set both declare is refused nothing", () => {
  expect(over(HOLDS_TYPE, HOLDS_TYPE.replace("one: number", "three: boolean"))).toEqual([])
})

test("a member a module and the shared set both declare is refused", () => {
  const said = over(HOLDS_TYPE, HOLDS_TYPE)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`Held.one` is declared at")
})

test("a member is refused though both files spell one type", () => {
  expect(reasoned(over(HOLDS_TYPE, HOLDS_TYPE))).toContain("while the two spell one type")
})

test("a member the shared set declares apart from the module's is refused nothing", () => {
  expect(over(HOLDS_TYPE, HOLDS_MEMBER)).toEqual([])
})

test("a value and a type spelt alike are two names", () => {
  expect(over(HOLDS_VALUE, "interface HELD {\n  one: number\n}\n")).toEqual([])
})

test("a value name two declaration files both declare is refused", () => {
  const said = across(HOLDS_VALUE, HOLDS_VALUE)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`HELD` is declared at")
})

test("a refusal two declaration files earn is reported against the later of the two", () => {
  const said = across(HOLDS_VALUE, HOLDS_VALUE)
  expect(said[0]?.path).toBe(SHARED_AT)
  expect(reasoned(said)).toContain(OTHER_AT)
})

test("a declaration file declaring a name no other declaration file declares is refused nothing", () => {
  expect(across(APART, HOLDS_VALUE)).toEqual([])
})

test("an interface two declaration files both declare is refused nothing", () => {
  expect(across(HOLDS_TYPE, HOLDS_TYPE.replace("one: number", "three: boolean"))).toEqual([])
})

test("a member two declaration files both declare is refused", () => {
  const said = across(HOLDS_TYPE, HOLDS_TYPE)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("`Held.one` is declared at")
})

test("a member two declaration files declare is refused though the two spell one type", () => {
  expect(reasoned(across(HOLDS_TYPE, HOLDS_TYPE))).toContain("while the two spell one type")
})

test("a value and a type two declaration files declare alike are two names", () => {
  expect(across(HOLDS_VALUE, HOLDS_ALIAS)).toEqual([])
})

test("a clash the change carries the module of is refused", () => {
  expect(over(HOLDS_VALUE, HOLDS_VALUE).map((each) => each.path)).toEqual([MODULE_AT])
})

test("a clash the change carries neither of the two files of is refused nothing", () => {
  const held = globally(indented(HOLDS_VALUE))
  const root = staging(HOLDS_VALUE, held)
  const apart = "akasha/two.module.code.ts"
  expect(judged(change(root, { [apart]: "export const away = 2\n" }))).toEqual([])
})

test("a clash the change carries the declaration file of alone is refused", () => {
  const held = globally(indented(HOLDS_VALUE))
  const root = staging(HOLDS_VALUE, held)
  const said = judged(change(root, { [SHARED_AT]: HOLDS_VALUE }))
  expect(said.map((each) => each.path)).toEqual([MODULE_AT])
})

test("a module spelling no declare global states no global", () => {
  expect(statedIn(MODULE_AT, `export const away = 1\n${HOLDS_VALUE}`)).toEqual([])
})

test("a file importing and exporting nothing states its globals at its top level", () => {
  expect(statedIn(SHARED_AT, HOLDS_VALUE).map((one) => one.name)).toEqual(["HELD"])
})

test("an interface states its own name beside each member it holds", () => {
  expect(statedIn(SHARED_AT, HOLDS_TYPE).map(keyOf)).toEqual(["type Held", "type Held.one"])
})

test("a name is keyed by the space the name is declared in", () => {
  const value = statedIn(SHARED_AT, HOLDS_VALUE)[0]
  expect(value === undefined ? "" : keyOf(value)).toBe("value HELD")
})

test("two interfaces merge and two members do not", () => {
  const one = statedIn(SHARED_AT, HOLDS_TYPE)
  const named = one[0]
  const member = one[1]
  expect(named !== undefined && mergedBy(named, named)).toBe(true)
  expect(member !== undefined && mergedBy(member, member)).toBe(false)
})

test("the files read are the ones the index names beside the ones the change carries", () => {
  const held = globally(indented(HOLDS_VALUE))
  const added = "akasha/two.module.code.ts"
  const given = change(staging(APART, held), { [added]: held })
  expect(reached(given)).toEqual([MODULE_AT, SHARED_AT, added])
})

test("a file the change takes away is read no more", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(staging(HOLDS_VALUE, held), { [MODULE_AT]: null })
  expect(judged(given)).toEqual([])
})

test("a body is read from the change rather than from the disk", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(staging(HOLDS_VALUE, held), { [MODULE_AT]: globally(indented(APART)) })
  expect(judged(given)).toEqual([])
})

test("a TypeScript file akasha compiles is input to this check", () => {
  expect(globalDeclaredOnce.isInput(MODULE_AT, {} as never)).toBe(true)
})

test("a file inside the packages folder is no input", () => {
  expect(globalDeclaredOnce.isInput("node_modules/one/one.ts", {} as never)).toBe(false)
})

test("the declaration files read are the ones the index names as carrying ambient types", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(naming(HOLDS_VALUE, held), { [MODULE_AT]: held })
  expect(reached(given)).toEqual([MODULE_AT, SHARED_AT])
})

test("a declaration file the index names no ambient types on is read no further", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(naming(HOLDS_VALUE, held), { [MODULE_AT]: held })
  expect(reached(given)).not.toContain(APART_AT)
})

test("every file the index names is read where the change carries a declaration file", () => {
  const held = globally(indented(HOLDS_VALUE))
  const given = change(naming(HOLDS_VALUE, held), { [SHARED_AT]: HOLDS_VALUE })
  expect(reached(given)).toEqual([APART_AT, MODULE_AT, SHARED_AT])
})

test("a clash with a declaration file the index names is refused where the reach is narrow", () => {
  const held = globally(indented(HOLDS_VALUE))
  const said = judged(change(naming(HOLDS_VALUE, held), { [MODULE_AT]: held }))
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(MODULE_AT)
  expect(reasoned(said)).toContain(SHARED_AT)
})
