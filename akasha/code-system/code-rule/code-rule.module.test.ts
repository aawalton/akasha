import { expect, test } from "bun:test"
import { speltIn } from "./code-rule.module.code.ts"

const EXPORTED_AS = `export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}
`

const CAMEL = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

function ruleFor(text: string, name: string): string {
  const found = speltIn("one.ts", text).find((each) => each.name === name)
  if (found === undefined) throw new Error(`no \`${name}\` was read out of the text`)
  return found.rule
}

test("a rule is the same when only the function and its names differ", () => {
  expect(ruleFor(CAMEL, "camel")).toBe(ruleFor(EXPORTED_AS, "exportedAs"))
})

test("a rule differs when what the function does differs", () => {
  const other = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toLowerCase())
}
`
  expect(ruleFor(other, "camel")).not.toBe(ruleFor(EXPORTED_AS, "exportedAs"))
})

test("a local bound in the body is read as the order it is bound, not as its name", () => {
  const one = `function held(said: string): string {
  const first = said.trim()
  return first
}
`
  const two = `function held(given: string): string {
  const only = given.trim()
  return only
}
`
  expect(ruleFor(one, "held")).toBe(ruleFor(two, "held"))
})

test("a name the function does not bind stays as it is written", () => {
  const one = `function held(said: string): string {
  return upper(said)
}
`
  const two = `function held(said: string): string {
  return lower(said)
}
`
  expect(ruleFor(one, "held")).not.toBe(ruleFor(two, "held"))
})

test("a function a file exports is marked, and one it keeps is not", () => {
  const both = `${EXPORTED_AS}\n${CAMEL}`
  const found = speltIn("one.module.code.ts", both)
  expect(found.find((each) => each.name === "exportedAs")?.exported).toBe(true)
  expect(found.find((each) => each.name === "camel")?.exported).toBe(false)
})

test("an exported arrow bound to a const is marked too", () => {
  const said = `export const twice = (one: number): number => one * 2\n`
  expect(speltIn("one.module.code.ts", said)[0]?.exported).toBe(true)
})

test("an arrow bound inside a function is read as its own rule", () => {
  const said = `function held(): number {
  const twice = (one: number): number => one * 2
  return twice(2)
}
`
  const found = speltIn("one.ts", said).map((each) => each.name)
  expect(found.sort()).toEqual(["held", "twice"])
})

test("a rule bound to nothing is not read, because only a function is", () => {
  const said = `const one = "a-b".replace(/-/g, "")\n`
  expect(speltIn("one.ts", said)).toEqual([])
})

test("a declaration with no body says no rule", () => {
  expect(speltIn("one.d.ts", "export declare function held(one: string): string\n")).toEqual([])
})
