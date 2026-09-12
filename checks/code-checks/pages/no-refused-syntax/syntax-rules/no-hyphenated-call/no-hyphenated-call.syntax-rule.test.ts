import { expect, test } from "bun:test"
import {
  LEVELS_NAMED,
  NO_READERS,
  PROBE_AT,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import { noHyphenatedCall } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-hyphenated-call/no-hyphenated-call.syntax-rule.code.ts"
import type { Refusal } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/source/code-source.module.code.ts"

const HOLDS_NO_CODE = "akasha/one/probe.module.test.ts"

function judged(path: string, text: string): readonly Refusal[] {
  return noHyphenatedCall({
    path,
    source: parsedAs(path, text),
    readers: NO_READERS,
    namedAt: LEVELS_NAMED,
  })
}

function over(text: string): readonly Refusal[] {
  return judged(PROBE_AT, text)
}

test("a call collapsed into one hyphenated word is refused", () => {
  const said = over('const SELF = "akasha temper-addon-data-generate"\n')
  expect(said).toHaveLength(1)
  expect(said[0]?.reason).toContain("akasha temper addon data-generate")
})

test("the same call spelled with spaces is left alone", () => {
  expect(over('const SELF = "akasha temper addon data-generate"\n')).toEqual([])
})

test("a namespace collapsed into one word is refused too", () => {
  expect(over('const UP = "akasha temper-addon"\n')).toHaveLength(1)
})

test("a level whose own name carries a hyphen is left alone", () => {
  expect(over('const AT = "akasha work-tree"\n')).toEqual([])
})

test("a hyphenated name no level of the command tree carries is left alone", () => {
  expect(over('const AT = "akasha stray-word"\n')).toEqual([])
})

test("a slug with no akasha before it names a page and is left alone", () => {
  expect(over('const PAGE = "temper-addon-data-generate"\n')).toEqual([])
})

test("a specifier under the akasha package is left alone", () => {
  expect(over('import { one } from "akasha/temper/addon/one.module.code.ts"\n')).toEqual([])
})

test("a piece of a template literal is judged as a whole string literal is", () => {
  expect(over("const why = `${one} came from akasha temper-addon-data-generate`\n")).toHaveLength(1)
})

test("a file that holds no code is judged not", () => {
  expect(judged(HOLDS_NO_CODE, 'const SELF = "akasha temper-addon-data-generate"\n')).toEqual([])
})

test("the line named is the line the literal is on", () => {
  expect(over('const one = 1\nconst SELF = "akasha temper-addon"\n')[0]?.line).toBe(2)
})

test("two collapsed calls in one literal are refused once each", () => {
  expect(
    over('const SAID = "akasha temper-addon-data-generate and akasha temper-addon"\n')
  ).toHaveLength(2)
})
