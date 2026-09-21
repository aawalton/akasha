import { expect, test } from "bun:test"
import {
  type Ahead,
  aheadIn,
  unboundIn,
} from "akasha/change/modules/load-order/load-order.module.code.ts"
import { parsedAs } from "akasha/code/reading/modules/code-source/code-source.module.code.ts"

const AT = "akasha/one/one.held.ts"

const SET_TYPES = `const POSSIBLE_SET_TYPES: { [index: number]: string } = {
  [1]: "LIBSETS_SETTYPE_ARENA",
}

for (const [setTypeId, setTypeName] of ipairs(POSSIBLE_SET_TYPES)) {
  G[setTypeName] = setTypeId
}

export const SET_TYPES_TO_NAME = {
  [LIBSETS_SETTYPE_ARENA]: { en: "Arena" },
}
`

const ABOVE_NOTHING = `export const SET_TYPES_TO_NAME = {
  [LIBSETS_SETTYPE_ARENA]: { en: "Arena" },
}
`

const DECLARED = `const LIBSETS_SETTYPE_ARENA = 1

G.held = true

export const SET_TYPES_TO_NAME = {
  [LIBSETS_SETTYPE_ARENA]: { en: "Arena" },
}
`

const HELD_BY_A_FUNCTION = `G.held = true

export const nameOf = (): unknown => SET_TYPES_TO_NAME
`

const NO_VARIABLE = `G.held = true

export function nameOf(): unknown {
  return SET_TYPES_TO_NAME
}
`

const RUNS_LOOSE = `import { lib } from "./lib.ts"

lib.allowed = {}
for (let i = LIBSETS_SETTYPE_BEGIN; i <= LIBSETS_SETTYPE_END; i++) {
  lib.allowed[i] = LIBSETS_SETTYPE_END
}
if (checkIfLive()) {
  lib.live = true
}
`

const TYPED_ONLY = "export const held: typeof LIBSETS_SETTYPE_ARENA = 1 as LibSets.Kind\n"

function aheadOf(text: string, at: number): Ahead | null {
  const source = parsedAs(AT, text)
  const one = source.statements.at(at)
  return one === undefined ? null : aheadIn(source, one)
}

function unboundOf(text: string, at: number): readonly string[] {
  const source = parsedAs(AT, text)
  const one = source.statements.at(at)
  return one === undefined ? [] : unboundIn(source, one)
}

test("a value reading a name the body binds nowhere, below a statement that runs, is answered", () => {
  expect(aheadOf(SET_TYPES, 2)).toEqual({
    name: "LIBSETS_SETTYPE_ARENA",
    above: "for (const [setTypeId, setTypeName] of ipairs(POSSIBLE_SET_TYPES)) {",
  })
})

test("a value with nothing above it that runs is answered with nothing", () => {
  expect(aheadOf(ABOVE_NOTHING, 0)).toBe(null)
})

test("a value reading only names the body binds is answered with nothing", () => {
  expect(aheadOf(DECLARED, 2)).toBe(null)
})

test("a name a function in that value holds is read by nothing as the body loads", () => {
  expect(aheadOf(HELD_BY_A_FUNCTION, 1)).toBe(null)
})

test("a declaration that is no variable statement is answered with nothing", () => {
  expect(aheadOf(NO_VARIABLE, 1)).toBe(null)
})

test("every name a statement reads from outside the body is answered, once each", () => {
  expect(unboundOf(RUNS_LOOSE, 2)).toEqual(["LIBSETS_SETTYPE_BEGIN", "LIBSETS_SETTYPE_END"])
  expect(unboundOf(RUNS_LOOSE, 3)).toEqual(["checkIfLive"])
})

test("a name the statement itself binds is not read from outside the body", () => {
  expect(unboundOf(SET_TYPES, 1)).toEqual(["ipairs", "G"])
})

test("a name a type holds is read by nothing", () => {
  expect(unboundOf(TYPED_ONLY, 0)).toEqual([])
})

test("a key a value spells bare is no name read", () => {
  expect(unboundOf(ABOVE_NOTHING, 0)).toEqual(["LIBSETS_SETTYPE_ARENA"])
})

test("a function declaration reads nothing as the body loads", () => {
  expect(unboundOf(NO_VARIABLE, 1)).toEqual([])
})
