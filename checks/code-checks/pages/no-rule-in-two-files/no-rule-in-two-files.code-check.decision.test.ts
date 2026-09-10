import { afterAll, expect, test } from "bun:test"
import { shadowFor } from "@akasha/pages/shadow"
import { everySpeltIn, reasonsIn } from "./no-rule-in-two-files.code-check.decision.code.ts"
import {
  bothArriving,
  byRule,
  CAMEL,
  EXPORTED_AS,
  ONE_CODE,
  rooted,
  scratch,
  TWO_CODE,
  WIDEN,
} from "./no-rule-in-two-files.code-check.decision.test-fixtures.ts"

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

test("a rule spelled inline is not seen, because only a function is read", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  const every = byRule([{ path: "two.module.code.ts", text: EXPORTED_AS }])
  expect(reasonsIn("one.ts", inline, every)).toEqual([])
})

test("the files a change brings are among those a rule is looked for in", () => {
  const change = bothArriving(rooted())
  const cast = shadowFor(change)
  if ("refused" in cast) throw new Error(cast.refused)
  const every = everySpeltIn(change, cast.shadow)
  const said = [...every.values()].flat().map((one) => one.path)
  expect(said.sort()).toEqual([ONE_CODE, TWO_CODE])
})
