import { expect, test } from "bun:test"
import { speltIn } from "akasha/code-system/code-rule/code-rule.module.code.ts"

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

test("a name an array pattern binds is read as its order, not as its name", () => {
  const one = `function held(said: readonly string[]): string {
  const [first = ""] = said
  return first.trim()
}
`
  const two = `function held(said: readonly string[]): string {
  const [only = ""] = said
  return only.trim()
}
`
  expect(ruleFor(one, "held")).toBe(ruleFor(two, "held"))
})

test("a renamed object property is read as its order, the property staying as written", () => {
  const one = `function held(said: { key: string }): string {
  const { key: first } = said
  return first.trim()
}
`
  const two = `function held(said: { key: string }): string {
  const { key: only } = said
  return only.trim()
}
`
  expect(ruleFor(one, "held")).toBe(ruleFor(two, "held"))
})

test("a name a pattern takes the rest into is read as its order", () => {
  const one = `function held(said: { key: string; more: string }): number {
  const { key, ...first } = said
  return Object.keys(first).length + key.length
}
`
  const two = `function held(said: { key: string; more: string }): number {
  const { key, ...only } = said
  return Object.keys(only).length + key.length
}
`
  expect(ruleFor(one, "held")).toBe(ruleFor(two, "held"))
})

test("a name a parameter's own pattern binds is read as its order", () => {
  const one = `function held({ key: first }: { key: string }): string {
  return first.trim()
}
`
  const two = `function held({ key: only }: { key: string }): string {
  return only.trim()
}
`
  expect(ruleFor(one, "held")).toBe(ruleFor(two, "held"))
})

test("a shorthand name in an object pattern stays as written, naming the property read", () => {
  const one = `function held(said: { first: string; only: string }): string {
  const { first } = said
  return first.trim()
}
`
  const two = `function held(said: { first: string; only: string }): string {
  const { only } = said
  return only.trim()
}
`
  expect(ruleFor(one, "held")).not.toBe(ruleFor(two, "held"))
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
  expect(found.toSorted()).toEqual(["held", "twice"])
})

test("a function passing its names along and nothing else is marked as doing so", () => {
  const said = `function held(one: string): string {
  return upper(one)
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(true)
})

test("a body holding a literal says something of its own", () => {
  const said = `function held(one: string): string {
  return one.replace(/-/g, "")
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(false)
})

test("a body holding an operator says something of its own", () => {
  const said = `function held(one: number): number {
  return one * 2
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(false)
})

test("a body holding a branch says something of its own", () => {
  const said = `function held(one: string): string {
  if (isEmpty(one)) return other(one)
  return upper(one)
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(false)
})

test("a template joining the names a function binds passes those names along", () => {
  const said = `function held(one: string, two: number): string {
  return \`\${one}-\${two}\`
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(true)
})

test("a template beside a literal says something of its own", () => {
  const said = `function held(one: string, two: number): string {
  return \`\${one}-\${two}\`.replace(/-/g, "")
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(false)
})

test("a body holding a backtick string with no name in it says something of its own", () => {
  const said = `function held(): string {
  return \`held\`
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(false)
})

test("a cast to a type passes its names along, since a type is no literal", () => {
  const said = `function held(one: unknown): Page {
  return one as Page
}
`
  expect(speltIn("one.ts", said)[0]?.forwards).toBe(true)
})

test("a body answering one literal and nothing else is built only out of literals", () => {
  const said = `const nothing = (): null => null\n`
  expect(speltIn("one.ts", said)[0]?.literal).toBe(true)
})

test("a block whose one statement returns a literal is built that way too", () => {
  const said = `function noNode(): boolean {
  return false
}
`
  expect(speltIn("one.ts", said)[0]?.literal).toBe(true)
})

test("an object whose every key is a name and every value a literal is a literal", () => {
  const said = `function held(): Writer {
  return { bytes: [], currentByte: 0, bitPosition: 0 }
}
`
  expect(speltIn("one.ts", said)[0]?.literal).toBe(true)
})

test("a name held as a value leaves the body built out of more than literals", () => {
  const said = `function held(): Style {
  return { fontSize: 27, fontColorField: TOOLTIP_COLOR }
}
`
  expect(speltIn("one.ts", said)[0]?.literal).toBe(false)
})

test("a body answering two names joined by an operator is built out of more than literals", () => {
  const said = `function held(one: number, two: number): boolean {
  return one <= two
}
`
  expect(speltIn("one.ts", said)[0]?.literal).toBe(false)
})

test("a body answering a literal beside anything else is built out of more than literals", () => {
  const said = `function held(): number {
  const one = 1
  return one
}
`
  expect(speltIn("one.ts", said)[0]?.literal).toBe(false)
})

test("a rule bound to nothing is not read, because only a function is", () => {
  const said = `const one = "a-b".replace(/-/g, "")\n`
  expect(speltIn("one.ts", said)).toEqual([])
})

test("two guards narrowing to different types say different rules", () => {
  const one = `function isHeld(said: unknown): said is Held {
  return typeof said === "object" && said !== null
}
`
  const two = `function isHeld(said: unknown): said is Other {
  return typeof said === "object" && said !== null
}
`
  expect(ruleFor(one, "isHeld")).not.toBe(ruleFor(two, "isHeld"))
})

test("one narrowing is one rule however the name it narrows is spelled", () => {
  const one = `function isHeld(said: unknown): said is Held {
  return typeof said === "object" && said !== null
}
`
  const two = `function isHeld(given: unknown): given is Held {
  return typeof given === "object" && given !== null
}
`
  expect(ruleFor(one, "isHeld")).toBe(ruleFor(two, "isHeld"))
})

test("a return type that is no type predicate says nothing, two names for one type included", () => {
  const said = `function wordsOf(text: string): string[] {
  return text.split(" ").filter((one) => one !== "")
}
`
  const named = `function wordsOf(text: string): Word[] {
  return text.split(" ").filter((one) => one !== "")
}
`
  const bare = `function wordsOf(text: string) {
  return text.split(" ").filter((one) => one !== "")
}
`
  expect(ruleFor(named, "wordsOf")).toBe(ruleFor(said, "wordsOf"))
  expect(ruleFor(bare, "wordsOf")).toBe(ruleFor(said, "wordsOf"))
})

test("a declaration with no body says no rule", () => {
  expect(speltIn("one.d.ts", "export declare function held(one: string): string\n")).toEqual([])
})
