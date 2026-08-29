import { expect, test } from "bun:test"
import { speltIn } from "../../../code-system/code-rule.module.code.ts"
import type { Owner } from "./no-second-spelling.check.code.ts"
import { reasonsIn } from "./no-second-spelling.check.code.ts"

const EXPORTED_AS = `export function exportedAs(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, one: string) => one.toUpperCase())
}
`

const CAMEL = `function camel(slug: string): string {
  return slug.replace(/-([a-z0-9])/g, (_, first: string) => first.toUpperCase())
}
`

function owning(text: string, name: string, path: string): ReadonlyMap<string, Owner> {
  const found = speltIn(path, text).find((each) => each.name === name)
  if (found === undefined) throw new Error(`no \`${name}\` was read out of the text`)
  return new Map<string, Owner>([[found.rule, { path, name }]])
}

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
