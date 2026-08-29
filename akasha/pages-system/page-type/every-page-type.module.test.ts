import { expect, test } from "bun:test"
import { everyPageType } from "./every-page-type.module.code.ts"

const DECLARED: Readonly<Record<string, string | null>> = {
  page: null,
  domain: "page",
  module: "domain",
  command: "module",
  "page-type": "domain",
  "page-property-type": "page-type",
}

test("what each page type extends is declared as the page itself states it", () => {
  const stated: Record<string, string | null> = {}
  for (const one of Object.values(everyPageType)) {
    const held = (one as { extendsSlug?: string | null }).extendsSlug
    stated[one.slug] = held ?? null
  }
  expect(stated).toEqual({ ...DECLARED })
})

test("every page type gathered here is registered under the slug it carries", () => {
  for (const [named, one] of Object.entries(everyPageType)) {
    const camel = one.slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase())
    expect(named).toBe(camel)
  }
})

test("the declared chain names every page type gathered, and no other", () => {
  const gathered = Object.values(everyPageType)
    .map((one) => one.slug)
    .sort()
  expect(Object.keys(DECLARED).sort()).toEqual(gathered)
})

test("exactly one page type extends nothing, so the chain has one root", () => {
  const roots = Object.entries(DECLARED).filter(([, above]) => above === null)
  expect(roots.map(([one]) => one)).toEqual(["page"])
})

test("what a page type extends is itself a page type, so no chain leaves the set", () => {
  for (const above of Object.values(DECLARED)) {
    if (above === null) continue
    expect(Object.keys(DECLARED)).toContain(above)
  }
})
