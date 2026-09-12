import { expect, test } from "bun:test"
import {
  LEVELS_NAMED,
  LEVELS_TYPED,
  NO_READERS,
  PROBE_AT,
} from "akasha/checks/code-checks/pages/no-refused-syntax/no-refused-syntax.code-check.decision.test-fixtures.ts"
import {
  mark,
  noCallNamingNoLevel,
} from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/no-call-naming-no-level/no-call-naming-no-level.syntax-rule.code.ts"
import type { Refusal } from "akasha/checks/code-checks/pages/no-refused-syntax/syntax-rules/syntax-rule.page-type.ts"
import { parsedAs } from "akasha/code/modules/source/code-source.module.code.ts"

function judged(path: string, text: string): readonly Refusal[] {
  return noCallNamingNoLevel({
    path,
    source: parsedAs(path, text),
    readers: NO_READERS,
    namedAt: LEVELS_NAMED,
    typedAt: LEVELS_TYPED,
  })
}

function over(text: string): readonly Refusal[] {
  return judged(PROBE_AT, text)
}

function said(text: string): string {
  return `const one = ${JSON.stringify(text)}\n`
}

const TICK = "`"

function marked(call: string): string {
  return `${TICK}akasha ${call}${TICK}`
}

test("a call whose every word names a level is refused nothing", () => {
  expect(over(said("run `akasha change draft` first"))).toEqual([])
})

test("a three-level call whose deepest name carries a hyphen is refused nothing", () => {
  expect(over(said("run `akasha temper addon data-generate`"))).toEqual([])
})

test("a word naming no level under a namespace is refused", () => {
  const found = over(said(`run ${marked("change take")} to take them`))
  expect(found).toHaveLength(1)
  expect(found[0]?.reason).toContain("`take` names no level under `akasha change`")
})

test("the refusal names the deepest level the call reached", () => {
  const found = over(said(marked("temper addon stray")))
  expect(found[0]?.reason).toContain("under `akasha temper addon`")
})

test("a word after a command is an argument rather than a level", () => {
  expect(over(said("`akasha change draft add-file`"))).toEqual([])
})

test("a call whose first word names no level is judged nothing", () => {
  expect(over(said("`akasha wander off somewhere`"))).toEqual([])
})

test("a call ending on a namespace is a listing rather than a fault", () => {
  expect(over(said("`akasha change` lists what it carries"))).toEqual([])
})

test("a flag ends the read rather than being judged as a level", () => {
  expect(over(said("`akasha change --help`"))).toEqual([])
})

test("a word the shell would fill in ends the read", () => {
  expect(over(said("`akasha change $act`"))).toEqual([])
})

test("a call marked by no backtick is not judged", () => {
  expect(over(said("akasha change take"))).toEqual([])
})

test("a sentence in single quotes is not judged, backticks alone marking a call", () => {
  expect(over(said("akasha sms send --text 'akasha change is named here'"))).toEqual([])
})

test("a literal that is itself the call is not judged, carrying no backtick inside", () => {
  expect(over(`const one = ${marked("change take")}\n`)).toEqual([])
})

test("two marked calls in one literal are refused once each", () => {
  const text = `${marked("change take")} and ${marked("change stray")}`
  expect(over(said(text))).toHaveLength(2)
})

test("a finding is judged nothing, holding what was said when it was said", () => {
  const at = "domains/findings/pages/one-thing-happened.finding.ts"
  expect(judged(at, said(marked("change take")))).toEqual([])
})

test("the same call outside a finding is refused", () => {
  expect(over(said(marked("change take")))).toHaveLength(1)
})

test("this mark excuses a file only where this rule could not have refused it", () => {
  const text = said(marked("change take"))
  expect(over(text)).toHaveLength(1)
  expect(mark(text, PROBE_AT)).toBe(true)
})

test("the line named is the line the literal is on", () => {
  const text = `const one = 1\nconst two = 2\n${said(marked("change take"))}`
  expect(over(text)[0]?.line).toBe(3)
})
