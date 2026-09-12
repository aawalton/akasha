import { expect, test } from "bun:test"
import {
  LEVELS_NAMED,
  LEVELS_TYPED,
  NO_READERS,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import {
  alsoNaming,
  mark,
  noCallBuiltAsItRuns,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-call-built-as-it-runs/no-call-built-as-it-runs.syntax-rule.code.ts"
import type { Refusal } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"

const CODE_AT = "temper/one/one.module.code.ts"

const OWN_AT = "commands/pages/temper/addon/temper-addon.command.code.ts"

const PAGE_AT = "commands/pages/temper/addon/temper-addon.command.ts"

const HOLDS_NO_CODE = "temper/one/one.module.test.ts"

function judged(path: string, text: string): readonly Refusal[] {
  return noCallBuiltAsItRuns({
    path,
    source: parsedAs(path, text),
    readers: NO_READERS,
    namedAt: LEVELS_NAMED,
    typedAt: LEVELS_TYPED,
  })
}

function over(text: string): readonly Refusal[] {
  return judged(CODE_AT, text)
}

test("a constant this file declares is put in place and the call it builds is refused", () => {
  const said = over('const AT = "temper-addon-data-generate"\nconst why = `run akasha ${AT} now`\n')
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha temper addon data-generate")
})

test("the same call built with the levels apart is left alone", () => {
  expect(
    over('const AT = "temper addon data-generate"\nconst why = `run akasha ${AT} now`\n')
  ).toEqual([])
})

test("a piece the code works out against a hyphen is refused where the slug before it names a level", () => {
  const said = over("const why = `akasha temper-${one}`\n")
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha temper something")
})

test("a piece worked out after a word no level of the tree carries is left alone", () => {
  expect(over("const why = `akasha stray-${one}`\n")).toEqual([])
})

test("a call whose every level the code works out is left alone", () => {
  expect(over("const why = `akasha ${one} ${two}`\n")).toEqual([])
})

test("a constant another file declares is not followed", () => {
  const text = 'import { AT } from "akasha/one/one.module.code.ts"\nconst why = `akasha ${AT}`\n'
  expect(over(text)).toEqual([])
})

test("a command's own call built from a constant in its code is refused", () => {
  const text = 'const UNDER = "addon"\nconst SELF = `akasha temper ${UNDER}`\n'
  const said = judged(OWN_AT, text)
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha temper addon")
})

test("what a directive on that page says is left alone", () => {
  const text =
    'const UNDER = "addon"\nexport const one = { directives: [{ act: `Run akasha temper ${UNDER} once` }] }\n'
  expect(judged(PAGE_AT, text)).toEqual([])
})

test("a name built as the code runs that names no call is left alone", () => {
  expect(over("const taken = { said, file: `${said}-file` }\n")).toEqual([])
})

test("a file that holds no code is judged not", () => {
  const text = 'const AT = "temper-addon-data-generate"\nconst why = `run akasha ${AT} now`\n'
  expect(judged(HOLDS_NO_CODE, text)).toEqual([])
})

test("the line refused is the template's own line", () => {
  const text = 'const AT = "temper-addon"\nconst one = 1\nconst why = `akasha ${AT}`\n'
  expect(over(text)[0]?.line).toBe(3)
})

test("this mark excuses a file only where this rule could not have refused it", () => {
  const text = "const why = `akasha temper-${one}`\n"
  expect(over(text)).toHaveLength(1)
  expect(mark(text, CODE_AT)).toBe(true)
})

test("the word put in for a worked-out piece names a level only where the slug before it names one", () => {
  const naming = alsoNaming(LEVELS_NAMED)
  expect(naming("temper-something")).toBe("something")
  expect(naming("stray-something")).toBeNull()
  expect(naming("temper-addon")).toBe("addon")
})
