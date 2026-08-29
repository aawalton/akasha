import { expect, test } from "bun:test"
import type { Owner } from "./no-second-spelling.check.code.ts"
import { reasonsIn, speltIn } from "./no-second-spelling.check.code.ts"

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

function owning(text: string, name: string, path: string): ReadonlyMap<string, Owner> {
  return new Map<string, Owner>([[ruleFor(text, name), { path, name }]])
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

test("a function a module exports is marked, and one it keeps is not", () => {
  const both = `${EXPORTED_AS}\n${CAMEL}`
  const found = speltIn("one.module.code.ts", both)
  expect(found.find((each) => each.name === "exportedAs")?.exported).toBe(true)
  expect(found.find((each) => each.name === "camel")?.exported).toBe(false)
})

test("an exported arrow bound to a const is marked too", () => {
  const said = `export const twice = (one: number): number => one * 2\n`
  expect(speltIn("one.module.code.ts", said)[0]?.exported).toBe(true)
})

test("a second spelling of what a module owns is refused, and names where to reach", () => {
  const owned = owning(
    EXPORTED_AS,
    "exportedAs",
    "pages-system/page/page-export-name.module.code.ts"
  )
  const said = reasonsIn("checks-system/checking.module.code.ts", CAMEL, owned)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`camel` spells again what `exportedAs`")
  expect(said[0]).toContain("page-export-name.module.code.ts")
})

test("the module that owns a rule may spell it, because it is the one place it is held", () => {
  const at = "pages-system/page/page-export-name.module.code.ts"
  expect(reasonsIn(at, EXPORTED_AS, owning(EXPORTED_AS, "exportedAs", at))).toEqual([])
})

test("a function saying something no module owns is passed over", () => {
  const other = `function widen(one: string): string {
  return one.padEnd(80, " ")
}
`
  expect(reasonsIn("one.ts", other, owning(EXPORTED_AS, "exportedAs", "two.ts"))).toEqual([])
})

test("a rule spelled inline is not seen, so this ratchets and proves no absence", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  expect(reasonsIn("one.ts", inline, owning(EXPORTED_AS, "exportedAs", "two.ts"))).toEqual([])
})
