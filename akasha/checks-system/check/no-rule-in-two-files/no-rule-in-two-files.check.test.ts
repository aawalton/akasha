import { expect, test } from "bun:test"
import { speltIn } from "../../../code-system/code-rule.module.code.ts"
import type { Said } from "./no-rule-in-two-files.check.code.ts"
import { reasonsIn } from "./no-rule-in-two-files.check.code.ts"

const CAMEL = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

const EXPORTED_AS = `export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}
`

const WIDEN = `function widen(one: string): string {
  return one.padEnd(80, " ")
}
`

type Held = { readonly path: string; readonly text: string }

function standing(held: readonly Held[]): ReadonlyMap<string, readonly Said[]> {
  const found = new Map<string, Said[]>()
  for (const one of held) {
    for (const each of speltIn(one.path, one.text)) {
      const already = found.get(each.rule) ?? []
      found.set(each.rule, [...already, { path: one.path, name: each.name }])
    }
  }
  return found
}

test("a rule standing in another file is refused, and the refusal names that file", () => {
  const every = standing([
    { path: "one.ts", text: CAMEL },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`camel` says what `exportedAs` in two.module.code.ts says")
})

test("a rule no other file spells is passed over", () => {
  const every = standing([
    { path: "one.ts", text: WIDEN },
    { path: "two.module.code.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", WIDEN, every)).toEqual([])
})

test("neither file is the owner, so a rule in two files refuses both", () => {
  const every = standing([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
  ])
  expect(reasonsIn("one.ts", CAMEL, every)).toHaveLength(1)
  expect(reasonsIn("two.ts", EXPORTED_AS, every)).toHaveLength(1)
})

test("a rule standing in more than one other file names one and counts the rest", () => {
  const every = standing([
    { path: "one.ts", text: CAMEL },
    { path: "two.ts", text: EXPORTED_AS },
    { path: "three.ts", text: EXPORTED_AS },
  ])
  const said = reasonsIn("one.ts", CAMEL, every)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("and in 1 file more")
})

test("a file saying the same thing twice is not judged here, one file being one place", () => {
  const both = `${CAMEL}\n${EXPORTED_AS}`
  expect(reasonsIn("one.ts", both, standing([{ path: "one.ts", text: both }]))).toEqual([])
})

test("a rule spelled inline is not seen, because only a function is read", () => {
  const inline = `const camel = one.slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())\n`
  const every = standing([{ path: "two.module.code.ts", text: EXPORTED_AS }])
  expect(reasonsIn("one.ts", inline, every)).toEqual([])
})
