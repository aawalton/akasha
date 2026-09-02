import { afterAll, expect, test } from "bun:test"
import { pathFiled } from "@akasha/indexes/testing"
import type { Change } from "@akasha/pages-system/change"
import { shadowFor } from "@akasha/pages-system/shadow"
import type ts from "typescript"
import type { Judged } from "../../../modules/judging/judging.module.code.ts"
import { change, scratch, staged } from "../typecheck/typecheck.code-check.test-fixtures.ts"
import {
  apartFrom,
  declarationsAgree,
  declaresIn,
  foundIn,
  ownedIn,
  rootedIn,
} from "./declarations-agree.code-check.code.ts"

afterAll(scratch.sweep)

const ONE_AT = "akasha/one.type-declaration.d.ts"

const TWO_AT = "akasha/two.type-declaration.d.ts"

const ONE_ID = "01a06110-0000-7000-8000-00000000d001"

const TWO_ID = "01a06110-0000-7000-8000-00000000d002"

const PLAIN = "declare const HELD_ONE: number\n"

const APART = "declare const HELD_TWO: string\n"

const SHADOWS = "declare const alert: (this: void, text: string) => void\n"

const MISSING = "declare const HELD_THREE: NothingDeclaresThis\n"

const NULLABLE = "interface Held {\n  one?: ?(a: string) => void\n}\n"

const SAYS_STRING = "interface Held {\n  one: (a: string) => void\n}\n"

const HOLDS_ONE = "declare const HELD_FOUR: (this: void, a: string) => void\n"

const HOLDS_TWO = "declare const HELD_FOUR: (this: void, a: number) => void\n"

const SHADOWS_AND_HOLDS = `${SHADOWS}${HOLDS_ONE}`

const SAYS_NUMBER = "interface Held {\n  one: (a: number) => void\n}\n"

function declaring(one: string, two: string): string {
  const root = staged({ [ONE_AT]: one, [TWO_AT]: two })
  pathFiled(root, ONE_AT, [{ path: ONE_AT, id: ONE_ID }])
  pathFiled(root, TWO_AT, [{ path: TWO_AT, id: TWO_ID }])
  return root
}

function judged(given: Change): readonly Judged[] {
  const cast = shadowFor(given)
  if ("refused" in cast) throw new Error(cast.refused)
  return declarationsAgree(given, cast.shadow)
}

function over(one: string, two: string): readonly Judged[] {
  return judged(change(declaring(one, two), { [ONE_AT]: one }))
}

function reasoned(said: readonly Judged[]): string {
  return said.map((each) => `${each.path} ${each.reason}`).join("\n")
}

test("a declaration set whose files agree is refused nothing", () => {
  expect(over(PLAIN, APART)).toEqual([])
})

test("one interface member declared twice and differently is refused", () => {
  const said = over(SAYS_STRING, SAYS_NUMBER)
  expect(said).toHaveLength(1)
  expect(reasoned(said)).toContain("TS2717")
})

test("the refusal names the declaration file the disagreement is written in", () => {
  const said = over(SAYS_STRING, SAYS_NUMBER)
  expect([ONE_AT, TWO_AT]).toContain(said[0]?.path ?? "")
})

test("a name no declaration file declares is refused, nothing else naming that name", () => {
  const said = over(MISSING, APART)
  expect(said).toHaveLength(1)
  expect(said[0]?.path).toBe(ONE_AT)
  expect(said[0]?.reason).toContain("TS2304")
})

test("an optional marker written as a nullable type is refused, no parse error saying so", () => {
  const said = over(NULLABLE, APART)
  expect(reasoned(said)).toContain("TS17020")
})

test("a declaration shadowing a standard library name alone is refused nothing", () => {
  expect(over(SHADOWS, APART)).toEqual([])
})

test("a declaration file the change leaves untouched is judged, and its refusal says so", () => {
  const root = declaring(PLAIN, SAYS_NUMBER)
  const said = judged(change(root, { [ONE_AT]: SAYS_STRING }))
  const away = said.filter((each) => each.path === TWO_AT)
  expect(reasoned(away)).toContain("the declaration set does not agree as this change leaves it")
})

test("a declaration set the change takes away altogether is compiled no more", () => {
  const root = declaring(SAYS_STRING, SAYS_NUMBER)
  expect(judged(change(root, { [ONE_AT]: null, [TWO_AT]: null }))).toEqual([])
})

test("a body is read from the change rather than from the disk", () => {
  const root = declaring(SAYS_STRING, SAYS_NUMBER)
  expect(judged(change(root, { [ONE_AT]: PLAIN }))).toEqual([])
})

test("an index naming no declaration file for a change carrying one is thrown rather than passed", () => {
  const root = staged({ [ONE_AT]: SAYS_STRING, [TWO_AT]: SAYS_NUMBER })
  const given = change(root, { [ONE_AT]: SAYS_STRING })
  const cast = shadowFor(given)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(() => foundIn(given, cast.shadow)).toThrow("the index names none")
})

test("a declaration file the change adds is compiled before the index names it", () => {
  const root = declaring(SAYS_STRING, APART)
  const added = "akasha/three.type-declaration.d.ts"
  const said = judged(change(root, { [added]: SAYS_NUMBER }))
  expect(reasoned(said)).toContain("TS2717")
})

test("a declaration file the change adds is rooted beside the ones the index names", () => {
  const root = declaring(PLAIN, APART)
  const added = "akasha/three.type-declaration.d.ts"
  expect(rootedIn(change(root, { [added]: PLAIN }), [ONE_AT, TWO_AT])).toEqual([
    ONE_AT,
    added,
    TWO_AT,
  ])
})

test("a declaration file the change takes away is rooted no more", () => {
  const root = declaring(PLAIN, APART)
  expect(rootedIn(change(root, { [ONE_AT]: null }), [TWO_AT])).toEqual([TWO_AT])
})

test("a declaration file is input to this check", () => {
  expect(declaresIn(ONE_AT)).toBe(true)
})

test("a TypeScript file that declares no ambient types is no input", () => {
  expect(declaresIn("akasha/one.module.code.ts")).toBe(false)
})

test("a declaration file outside akasha is no input", () => {
  expect(declaresIn("temper/one.d.ts")).toBe(false)
})

test("a diagnostic naming no other declaration is refused", () => {
  expect(apartFrom("/root", { code: 2304 } as ts.Diagnostic)).toBe(false)
})

test("a related declaration carrying no file is owned by nobody", () => {
  expect(ownedIn("/root", { code: 6203 } as ts.DiagnosticRelatedInformation)).toBe(false)
})

test("one name declared twice by two files is refused against each file declaring it", () => {
  const said = over(HOLDS_ONE, HOLDS_TWO)
  expect(said.map((each) => each.path).sort()).toEqual([ONE_AT, TWO_AT])
  expect(reasoned(said)).toContain("TS2451")
})

test("a standard library shadow beside a real disagreement hides neither the one nor the other", () => {
  const said = over(SHADOWS_AND_HOLDS, HOLDS_TWO)
  expect(reasoned(said)).toContain("HELD_FOUR")
  expect(reasoned(said)).not.toContain("alert")
})

test("a file the change adds is judged against the files the change leaves alone", () => {
  const root = declaring(HOLDS_ONE, APART)
  const said = judged(change(root, { [TWO_AT]: HOLDS_TWO }))
  expect(said.map((each) => each.path).sort()).toEqual([ONE_AT, TWO_AT])
})
