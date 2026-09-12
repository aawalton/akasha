import { afterAll, expect, test } from "bun:test"
import {
  everyFiledIn,
  everySpeltIn,
  reasonsIn,
  refusalsOver,
  refusingBy,
} from "akasha/checks/code-checks/pages/no-rule-in-two-files/no-rule-in-two-files.code-check.decision.code.ts"
import {
  bothArriving,
  byRule,
  CAMEL,
  EXPORTED_AS,
  ONE_CODE,
  readerFiledIn,
  rooted,
  scratch,
  TWO_CODE,
  unindexed,
  WIDEN,
} from "akasha/checks/code-checks/pages/no-rule-in-two-files/no-rule-in-two-files.code-check.decision.test-fixtures.ts"
import { speltIn } from "akasha/code/rule/code-rule.module.code.ts"
import { shadowAsked, shadowFor } from "akasha/pages/shadow/shadow.module.code.ts"

afterAll(scratch.sweep)

test("a rule in another file is refused, and the refusal names that file", () => {
  const every = byRule([
    { path: "one.ts", text: CAMEL },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`camel` says what `exportedAs` in two.module.code.ts says")
})

test("a rule no other file spells is passed over", () => {
  const every = byRule([
    { path: "one.ts", text: WIDEN },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", WIDEN, every)).toEqual([])
})

test("neither file is the owner, so a rule in two files refuses both", () => {
  const every = byRule([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", CAMEL, every)).toHaveLength(1)
  expect(reasonsIn("two.ts", EXPORTED_AS, every)).toHaveLength(1)
})

test("a rule in more than one other file names one and counts the rest", () => {
  const every = byRule([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
    { path: "three.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("and in 1 more")
})

test("a file saying the same thing twice is not judged here, one file being one place", () => {
  const both = `${CAMEL}\n${EXPORTED_AS}`
  expect(reasonsIn("one.ts", both, byRule([{ path: "one.ts", text: both }]))).toEqual([])
})

test("a cast written in two files is passed over, a cast being no rule", () => {
  const one = `function asPage(value: unknown): Page {
  return value as Page
}
`
  const two = `function asHeld(given: unknown): Page {
  return given as Page
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toEqual([])
  expect(reasonsIn("two.ts", two, every)).toEqual([])
})

test("a body passing its names to one call is passed over however many files write it", () => {
  const one = `function bodyAt(path: string): string {
  return textIn(change, path)
}
`
  const two = `function beside(at: string): string {
  return textIn(change, at)
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toEqual([])
})

test("a body holding a literal is a rule, so two files writing it are refused", () => {
  const one = `function escapeRegex(str: string): string {
  return str.replace(/[.*+?]/g, "\\\\$&")
}
`
  const two = `function escapeRegExp(said: string): string {
  return said.replace(/[.*+?]/g, "\\\\$&")
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toHaveLength(1)
})

test("a body that is one literal is passed over, nothing in it being able to change", () => {
  const one = `function noNode(): null {
  return null
}
`
  const two = `function gone(): null {
  return null
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  const [said] = speltIn("one.ts", one)
  if (said === undefined) throw new Error("that body spells no rule")
  expect(every(said.rule)).toHaveLength(2)
  expect(reasonsIn("one.ts", one, every)).toEqual([])
})

test("a body answering an object built only of literals is passed over too", () => {
  const one = `function makeBitWriter(): Writer {
  return { bytes: [], currentByte: 0, bitPosition: 0 }
}
`
  const two = `function freshWriter(): Writer {
  return { bytes: [], currentByte: 0, bitPosition: 0 }
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  const [said] = speltIn("one.ts", one)
  if (said === undefined) throw new Error("that body spells no rule")
  expect(every(said.rule)).toHaveLength(2)
  expect(reasonsIn("one.ts", one, every)).toEqual([])
})

test("a body holding a name beside its literals is refused, that name reading what it reads", () => {
  const one = `function gamepadBodyStyle(): Style {
  return { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
}
`
  const two = `function bodyStyle(): Style {
  return { fontSize: 27, fontColorField: GAMEPAD_TOOLTIP_COLOR_GENERAL_COLOR_3 }
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toHaveLength(1)
})

test("two bound names joined by one operator are a rule, so two files spelling it are refused", () => {
  const one = `function lapsed(one: number, two: number): boolean {
  return one <= two
}
`
  const two = `function isPacedMoveConfirmed(first: number, second: number): boolean {
  return first <= second
}
`
  const every = byRule([
    { path: "one.ts", text: one },
    { path: "two.ts", text: two },
  ])
  expect(reasonsIn("one.ts", one, every)).toHaveLength(1)
})

test("a rule spelled inline is not seen, because only a function is read", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  const every = byRule([{ path: "two.module.code.ts", text: EXPORTED_AS }])
  expect(reasonsIn("one.ts", inline, every)).toEqual([])
})

test("a change with no code file is refused nothing though the index cannot be read", () => {
  const change = unindexed()
  const shadow = shadowAsked(change)
  expect(() => shadow.index.everyPath()).toThrow("could not be answered")
  expect(refusalsOver(change, shadow)).toEqual([])
})

test("the files a change brings are among those a rule is looked for in", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const every = everySpeltIn(change, cast.shadow)
  const [one] = speltIn(ONE_CODE, CAMEL)
  if (one === undefined) throw new Error("that body spells no rule")
  const said = every(one.rule).map((each) => each.path)
  expect(said.sort()).toEqual([ONE_CODE, TWO_CODE])
})

test("the filed map answers what parsing answers, refusal for refusal", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const parsed = refusingBy(change, everySpeltIn(change, cast.shadow))
  expect(parsed.length).toBeGreaterThan(0)
  expect(refusingBy(change, everyFiledIn(cast.shadow))).toEqual(parsed)
})

test("a map no reader of today's body filed parses every file named", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  expect(cast.shadow.index.ruleShort()).toBe(null)
  expect(refusalsOver(change, cast.shadow, true)).toEqual(refusalsOver(change, cast.shadow))
})

test("an index short of paths it names parses those and reads the filed rules for the rest", () => {
  const change = bothArriving(readerFiledIn(rooted()))
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const short = cast.shadow.index.ruleShort()
  if (short === null) throw new Error("that map named no reader")
  expect(short.length).toBeGreaterThan(0)
  expect(short).not.toContain(ONE_CODE)
  expect(short).not.toContain(TWO_CODE)
  expect(refusalsOver(change, cast.shadow, true)).toEqual(refusalsOver(change, cast.shadow))
  expect(refusalsOver(change, cast.shadow, true).length).toBeGreaterThan(0)
})
