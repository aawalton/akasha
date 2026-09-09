import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"
import { REACHING } from "../add-file/add-file.change-mechanical-file.test-fixtures.ts"
import { addressFor, idFilled, runChange } from "./add-file-of-any-kind.change-mechanical.code.ts"

const AT = "akasha/one.held.ts"

const CODE = "akasha/one/one.module.code.ts"

const PLAIN = "akasha/one/notes.md"

const MINTED = /id: "[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"/

const PAGE_BODY = 'export const one = { pageTypeSlug: "held", slug: "one" } as const\n'

const STATED = 'export const one = { id: "held", pageTypeSlug: "held", slug: "one" } as const\n'

const UNDER = new Set(["text-property"])

function worldOf(named: ReadonlySet<string>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], {
      pageTypesIn: () => named,
      kindsUnder: () => UNDER,
    }),
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
    reaching: REACHING,
  }
}

const NOTHING_NAMED = worldOf(new Set<string>())

const PAGED = worldOf(new Set(["held"]))

function reachedBy(world: World, carried: { at: string; body: string }): World {
  return {
    ...world,
    reaching: (_world, at, given) => {
      carried.at = at
      carried.body = (given as { body: string }).body
      return Promise.resolve(NOTHING_OVER)
    },
  }
}

test("a path naming no page and no TypeScript name is written by the change judging the file alone", async () => {
  const said = await runChange(NOTHING_NAMED, { at: PLAIN, body: "alpha\n" })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([{ kind: "add", path: PLAIN, content: "alpha\n" }])
})

test("every other TypeScript path is written by the change judging the imports named", () => {
  expect(addressFor(NOTHING_NAMED, CODE)).toBe("change-mechanical/add-file-code")
})

test("a path under a page name is written by the change judging the pages named", () => {
  expect(addressFor(PAGED, AT)).toBe("change-mechanical/add-file-page")
})

test("a path under a page type name is written by the change judging the plural slug", () => {
  const world = worldOf(new Set(["page-type"]))

  expect(addressFor(world, "akasha/kept.page-type.ts")).toBe("change-mechanical/add-file-page-type")
})

test("a path under a page property name is written by the change judging the keys", () => {
  const world = worldOf(new Set(["text-property"]))

  expect(addressFor(world, "akasha/properties/kept.text-property.ts")).toBe(
    "change-mechanical/add-file-page-property"
  )
})

test("a page type reaches its own change with the id already in the body", async () => {
  const carried = { at: "", body: "" }
  const world = reachedBy(worldOf(new Set(["page-type"])), carried)

  const said = await runChange(world, { at: "akasha/kept.page-type.ts", body: PAGE_BODY })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical/add-file-page-type")
  expect(carried.body).toMatch(MINTED)
})

test("a body stating no id is given one worked out here", () => {
  expect(String(idFilled(AT, PAGE_BODY, "auto"))).toMatch(MINTED)
})

test("a body already stating an id keeps the id that body states", () => {
  expect(idFilled(AT, STATED, "auto")).toBe(STATED)
})

test("a body already stating an id refuses an id handed in beside that body", () => {
  expect(idFilled(AT, STATED, "01a07bd4-3a11-708f-ad12-c22715ac9f9c")).toEqual({
    refused: "the body states an `id` of its own, so `id` is left out or said as `auto`",
  })
})

test("an id a caller states goes in rather than one worked out", () => {
  expect(String(idFilled(AT, PAGE_BODY, "held"))).toContain('{ id: "held", pageTypeSlug: "held"')
})

test("a body declaring no literal is refused rather than written without an id", () => {
  expect(idFilled(AT, "export const one = 1\n", "auto")).toEqual({
    refused: "the body declares no literal, so no `id` goes into the body",
  })
})

test("a page reaches the change writing pages with the id already in the body", async () => {
  const carried = { at: "", body: "" }
  const said = await runChange(reachedBy(PAGED, carried), { at: AT, body: PAGE_BODY })

  expect(said.refused).toBe(null)
  expect(carried.at).toBe("change-mechanical/add-file-page")
  expect(carried.body).toMatch(MINTED)
})

test("a path naming no page takes no id", async () => {
  const carried = { at: "", body: "" }
  const said = await runChange(reachedBy(NOTHING_NAMED, carried), { at: PLAIN, body: PAGE_BODY })

  expect(said.refused).toBe(null)
  expect(carried.body).toBe(PAGE_BODY)
})
