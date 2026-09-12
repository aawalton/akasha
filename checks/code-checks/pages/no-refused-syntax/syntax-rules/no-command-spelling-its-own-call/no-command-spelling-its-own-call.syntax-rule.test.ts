import { expect, test } from "bun:test"
import {
  calledIn,
  mark,
  noCommandSpellingItsOwnCall,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-command-spelling-its-own-call/no-command-spelling-its-own-call.syntax-rule.code.ts"
import type {
  Given,
  Readers,
  Typing,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"
import type { Naming } from "akasha/commands/modules/walking/command-walking.module.code.ts"

const HUMMED_AT = "commands/pages/humming/deep-song/humming-deep-song.command.code.ts"

const HUMMED_PAGE_AT = "commands/pages/humming/deep-song/humming-deep-song.command.ts"

const HUMMED_TEST_AT = "commands/pages/humming/deep-song/humming-deep-song.command.test.ts"

const LEAF_AT = "commands/pages/humming/leaf/humming-leaf.command.code.ts"

const OUTSIDE_AT = "checks/one/one.module.code.ts"

const NO_READERS: Readers = new Map()

const NAMES_NOTHING: Naming = () => null

const TYPES_NOTHING: Typing = () => null

function at(path: string, text: string): Given {
  return {
    path,
    source: parsedAs(path, text),
    readers: NO_READERS,
    namedAt: NAMES_NOTHING,
    typedAt: TYPES_NOTHING,
  }
}

test("a command's own call spelled in its code is refused", () => {
  const said = noCommandSpellingItsOwnCall(
    at(HUMMED_AT, 'const SELF = "akasha humming deep-song"\n')
  )
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha humming deep-song")
})

test("the call spoken with a space where a hyphen belongs is refused", () => {
  const said = noCommandSpellingItsOwnCall(
    at(HUMMED_AT, 'const SELF = "akasha humming deep song"\n')
  )
  expect(said).toHaveLength(1)
})

test("another command's call is left alone", () => {
  expect(
    noCommandSpellingItsOwnCall(at(HUMMED_AT, 'const OTHER = "akasha humming leaf"\n'))
  ).toEqual([])
})

test("the word akasha naming the repository is left alone", () => {
  expect(noCommandSpellingItsOwnCall(at(HUMMED_AT, 'const HERE = "akasha"\n'))).toEqual([])
})

test("the namespace the command is under is left alone", () => {
  expect(noCommandSpellingItsOwnCall(at(HUMMED_AT, 'const UP = "akasha humming"\n'))).toEqual([])
})

test("a longer name the call opens is left alone", () => {
  expect(
    noCommandSpellingItsOwnCall(at(LEAF_AT, 'const AT = "akasha humming leaf-rows"\n'))
  ).toEqual([])
  expect(noCommandSpellingItsOwnCall(at(LEAF_AT, 'const AT = "akasha humming leaves"\n'))).toEqual(
    []
  )
})

test("the head of a template literal is judged as a whole string literal is", () => {
  const said = noCommandSpellingItsOwnCall(
    at(LEAF_AT, "const why = `akasha humming leaf takes no ${one}`\n")
  )
  expect(said).toHaveLength(1)
})

test("the tail of a template literal is judged too", () => {
  const said = noCommandSpellingItsOwnCall(
    at(LEAF_AT, "const why = `${one} is nothing akasha humming leaf takes`\n")
  )
  expect(said).toHaveLength(1)
})

test("a specifier naming the command's own folder is left alone", () => {
  const text =
    'import { one } from "akasha/commands/pages/humming/leaf/humming-leaf.module.code.ts"\n'
  expect(noCommandSpellingItsOwnCall(at(LEAF_AT, text))).toEqual([])
})

test("a command's own call spelled in an invariant on its page is refused", () => {
  const text = 'export const one = { statement: "a flag `akasha humming deep-song` takes" }\n'
  const said = noCommandSpellingItsOwnCall(at(HUMMED_PAGE_AT, text))
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha humming deep-song")
})

test("a command's own call spelled in its definition is refused", () => {
  const text = 'export const one = { definition: "what akasha humming deep-song answers" }\n'
  expect(noCommandSpellingItsOwnCall(at(HUMMED_PAGE_AT, text))).toHaveLength(1)
})

test("what a directive on that page says is left alone", () => {
  const text =
    'export const one = { directives: [{ act: "Run `akasha humming deep-song` once" }] }\n'
  expect(noCommandSpellingItsOwnCall(at(HUMMED_PAGE_AT, text))).toEqual([])
})

test("a test beside the code hands the call rather than spelling it", () => {
  const text = 'const GIVEN = { calledAs: "akasha humming deep-song" }\n'
  expect(noCommandSpellingItsOwnCall(at(HUMMED_TEST_AT, text))).toEqual([])
})

test("a file outside the commands is refused nothing", () => {
  expect(
    noCommandSpellingItsOwnCall(at(OUTSIDE_AT, 'const SELF = "akasha humming deep-song"\n'))
  ).toEqual([])
})

test("the line named is the line the literal is on", () => {
  const said = noCommandSpellingItsOwnCall(
    at(LEAF_AT, 'const one = 1\nconst SELF = "akasha humming leaf"\n')
  )
  expect(said[0]?.line).toBe(2)
})

test("this mark excuses a file only where this rule could not have refused it", () => {
  const text = 'const SELF = "akasha humming deep-song"\n'
  expect(noCommandSpellingItsOwnCall(at(HUMMED_AT, text))).toHaveLength(1)
  expect(mark(text, HUMMED_AT)).toBe(true)
})

test("the folders a command's file sits in are answered with a space for each slash", () => {
  expect(calledIn(HUMMED_AT)).toBe("humming deep-song")
  expect(calledIn(HUMMED_PAGE_AT)).toBe("humming deep-song")
})
