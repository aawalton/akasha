import { expect, test } from "bun:test"
import type { Change } from "@akasha/pages/change"
import type { Shadow } from "@akasha/pages/shadow"
import { couldTurn, generatorAt, typedOver } from "./type-generating.module.code.ts"

const ROOT = "/nowhere"

const AT = "pages/types/page-type.page-type.ts"

const OWN = "pages/types/page-type.page-type.types.ts"

const OTHER = "code-system/modules/module.page-type.types.ts"

const BYTES = new TextEncoder()

const STATED = { slug: "page-type", typeGenerator: "ts" }

function changeOver(bodies: ReadonlyMap<string, string>): Change {
  return {
    root: ROOT,
    changed: [...bodies.keys()],
    before: () => null,
    after: (path) => {
      const body = bodies.get(path)
      return body === undefined ? null : BYTES.encode(body)
    },
  }
}

function shadowOf(pages: ReadonlyMap<string, Record<string, unknown>>): Shadow {
  const index = {
    everyOfType: () => [...pages.keys()].map((path) => ({ path, id: path })),
  } as never
  return {
    index,
    filed: () => [],
    pageOf: (path) => pages.get(path) ?? null,
    codeAt: (path) => path,
  }
}

function only(page: Record<string, unknown>): ReadonlyMap<string, Record<string, unknown>> {
  return new Map([[AT, page]])
}

test("the generator sits beside the page type as that page type's `type-generator` section", () => {
  expect(generatorAt(AT)).toBe("pages/types/page-type.page-type.type-generator.ts")
})

test("a page type stating no type generator has no generator run for it", () => {
  let asked = 0
  const said = typedOver(changeOver(new Map()), shadowOf(only({ slug: "page-type" })), () => {
    asked += 1
    return { missing: "never reached" }
  })
  expect(asked).toBe(0)
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a page type stating a type generator has that generator's edits answered", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [{ path: OWN, body: BYTES.encode("export type PageType = {}\n") }],
  }))
  expect(said.edits).toEqual([{ kind: "add", path: OWN, content: "export type PageType = {}\n" }])
})

test("a page type is among the pages its own generator writes for", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [
      { path: OWN, body: BYTES.encode("export type PageType = {}\n") },
      { path: OTHER, body: BYTES.encode("export type Module = {}\n") },
    ],
  }))
  expect(said.edits.map((one) => one.path)).toEqual([OWN, OTHER])
})

test("a generator that is not there is said rather than thrown", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    missing: "no such file or directory",
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toHaveLength(1)
  expect(said.said[0]).toContain("page-type.page-type.type-generator.ts")
  expect(said.said[0]).toContain("no such file or directory")
})

test("a generator that breaks is said rather than thrown", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => {
      throw new Error("the shadow answered nothing")
    },
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toHaveLength(1)
  expect(said.said[0]).toContain("the shadow answered nothing")
})

test("a body equal to what is already at that path is left out", () => {
  const body = "export type PageType = {}\n"
  const said = typedOver(changeOver(new Map([[OWN, body]])), shadowOf(only(STATED)), () => ({
    generating: () => [{ path: OWN, body: BYTES.encode(body) }],
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a body other than what is already at that path is answered as a replacement", () => {
  const said = typedOver(
    changeOver(new Map([[OWN, "export type PageType = { was: true }\n"]])),
    shadowOf(only(STATED)),
    () => ({ generating: () => [{ path: OWN, body: BYTES.encode("export type PageType = {}\n") }] })
  )
  expect(said.edits).toEqual([
    {
      kind: "replace",
      path: OWN,
      contentFrom: "export type PageType = { was: true }\n",
      contentTo: "export type PageType = {}\n",
    },
  ])
})

test("a change naming no page type, no generator and no types file could turn nothing", () => {
  const change = changeOver(new Map([["command-system/calling/calling.module.code.ts", ""]]))
  expect(couldTurn(change)).toBe(false)
})

test("a change naming a page type could turn a type", () => {
  expect(couldTurn(changeOver(new Map([[AT, ""]])))).toBe(true)
})

test("a change naming a type generator could turn a type", () => {
  expect(couldTurn(changeOver(new Map([[generatorAt(AT) ?? "", ""]])))).toBe(true)
})

test("a change naming a types file could turn a type", () => {
  expect(couldTurn(changeOver(new Map([[OWN, ""]])))).toBe(true)
})
