import { afterAll, expect, test } from "bun:test"
import { scratchWorld } from "akasha/commands/modules/scratching/scratching.module.code.ts"
import {
  generatorAt,
  turnsFor,
  typedOver,
} from "akasha/commands/modules/type-generating/type-generating.module.code.ts"
import type { Change } from "akasha/pages/change/change.module.code.ts"
import {
  idFiled,
  listedFiled,
  valueAlsoFiled,
} from "akasha/pages/indexes/filing/index-filing.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const ROOT = "/nowhere"

const AT = "thrumming/types/page-type.page-type.ts"

const OWN = "thrumming/types/page-type.page-type.types.ts"

const OTHER = "thrumming/modules/module.page-type.types.ts"

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
    refusals: () => [],
    pageOf: (path) => pages.get(path) ?? null,
    codeAt: (path) => path,
  }
}

function only(page: Record<string, unknown>): ReadonlyMap<string, Record<string, unknown>> {
  return new Map([[AT, page]])
}

test("the generator sits beside the page type as that page type's `type-generator` section", () => {
  expect(generatorAt(AT)).toBe("thrumming/types/page-type.page-type.type-generator.ts")
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
    generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
  }))
  expect(said.edits).toEqual([{ kind: "add", path: OWN, content: "export type PageType = {}\n" }])
})

test("a page type is among the pages its own generator writes for", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [
      { kind: "add", path: OWN, content: "export type PageType = {}\n" },
      { kind: "add", path: OTHER, content: "export type Module = {}\n" },
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
    generating: () => [{ kind: "add", path: OWN, content: body }],
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

test("a body other than what is already at that path is answered as a replacement", () => {
  const said = typedOver(
    changeOver(new Map([[OWN, "export type PageType = { was: true }\n"]])),
    shadowOf(only(STATED)),
    () => ({
      generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
    })
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

const STATES_ONE = "01a090e0-64d6-7e42-83f5-17e72764a3b6"

function rootWhereAGeneratorIsStated(stated: Record<string, unknown>): string {
  const root = scratch.rootFor("type-generating-")
  listedFiled(root, "page-type", "page-type", [{ path: AT, id: STATES_ONE }])
  valueAlsoFiled(root, "page-type", [
    {
      path: AT,
      value: { id: STATES_ONE, pageTypeSlug: "page-type", slug: "page-type", ...stated },
    },
  ])
  idFiled(root, STATES_ONE, [{ path: AT, id: STATES_ONE }])
  return root
}

function askingOver(root: string): Change {
  return { root, changed: [], before: () => null, after: () => null }
}

test("a page type stating no type generator is asked nothing", () => {
  let asked = 0
  const said = turnsFor(askingOver(rootWhereAGeneratorIsStated({})), () => {
    asked += 1
    return { missing: "never reached" }
  })
  expect(asked).toBe(0)
  expect(said).toBe(false)
})

test("a generator saying nothing about what a change turns is run", () => {
  const root = rootWhereAGeneratorIsStated(STATED)

  expect(turnsFor(askingOver(root), () => ({ generating: () => [] }))).toBe(true)
})

test("a generator that could not be loaded is run rather than passed over", () => {
  const root = rootWhereAGeneratorIsStated(STATED)

  expect(turnsFor(askingOver(root), () => ({ missing: "no such file or directory" }))).toBe(true)
})

test("a generator saying the change turns nothing is not run", () => {
  const root = rootWhereAGeneratorIsStated(STATED)
  const said = turnsFor(askingOver(root), () => ({ generating: () => [], turning: () => false }))

  expect(said).toBe(false)
})

test("a generator saying the change turns nothing writes no type for that change", () => {
  const said = typedOver(changeOver(new Map()), shadowOf(only(STATED)), () => ({
    generating: () => [{ kind: "add", path: OWN, content: "export type PageType = {}\n" }],
    turning: () => false,
  }))
  expect(said.edits).toEqual([])
  expect(said.said).toEqual([])
})

const GENERATOR = generatorAt(AT) as string

const LEFT = "the body the change leaves\n"

test("a generator is handed the body the change leaves at that generator's path", () => {
  const handed: (string | null)[] = []
  typedOver(
    changeOver(new Map([[GENERATOR, LEFT]])),
    shadowOf(only(STATED)),
    (_root, _at, body) => {
      handed.push(body)
      return { generating: () => [] }
    }
  )
  expect(handed).toEqual([LEFT])
})

test("a generator the change leaves alone is handed no body", () => {
  const handed: (string | null)[] = []
  typedOver(changeOver(new Map()), shadowOf(only(STATED)), (_root, _at, body) => {
    handed.push(body)
    return { generating: () => [] }
  })
  expect(handed).toEqual([null])
})

test("what a change could turn is asked of the body the change leaves", () => {
  const handed: (string | null)[] = []
  const change: Change = {
    root: rootWhereAGeneratorIsStated(STATED),
    changed: [GENERATOR],
    before: () => null,
    after: (path) => (path === GENERATOR ? BYTES.encode(LEFT) : null),
  }
  turnsFor(change, (_root, _at, body) => {
    handed.push(body)
    return { generating: () => [] }
  })
  expect(handed).toEqual([LEFT])
})
