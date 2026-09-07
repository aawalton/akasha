import { expect, test } from "bun:test"
import { REACHING } from "../../../mechanical/pages/add-file/add-file.change-mechanical.test-fixtures.ts"
import {
  NOTHING_OVER,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { addFileCommand, idFilled } from "./add-file.change-authored.code.ts"

const AT = "akasha/one.held.ts"

const PLAIN = "akasha/one/notes.md"

const MINTED = /id: "[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}"/

const PAGE_BODY = 'export const one = { pageTypeSlug: "held", slug: "one" } as const\n'

const STATED = 'export const one = { id: "held", pageTypeSlug: "held", slug: "one" } as const\n'

function worldOf(held: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set<string>() }),
    textOf: (path) => held[path] ?? null,
    over: NOTHING_OVER,
    reaching: REACHING,
  }
}

test("the arguments naming a path and a body are answered as one edit", async () => {
  const said = await addFileCommand(worldOf({}), { at: PLAIN, body: "alpha\n" })

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ path: PLAIN, was: null, body: "alpha\n" }])
})

test("arguments holding no path are refused by the name of the argument", async () => {
  const said = await addFileCommand(worldOf({}), { body: "alpha\n" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`at`/)
})

test("arguments holding no body are refused by the name of the argument", async () => {
  const said = await addFileCommand(worldOf({}), { at: AT })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toMatch(/`body`/)
})

test("the body this change hands on is reached through the runner the world carries", async () => {
  let reached = ""
  const said = await addFileCommand(
    {
      ...worldOf({}),
      reaching: (_world, at) => {
        reached = at
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, body: "alpha\n" }
  )

  expect(reached).toBe("change-mechanical/add-code-file")
  expect(said.refused).toBeNull()
})

function pagedWorld(): World {
  return {
    ...worldOf({}),
    index: Object.assign({} as World["index"], { pageTypesIn: () => new Set(["held"]) }),
  }
}

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

test("a page reaches the mechanical change with the id already in the body", async () => {
  let carried = ""
  const said = await addFileCommand(
    {
      ...pagedWorld(),
      reaching: (_world, _at, given) => {
        carried = (given as { body: string }).body
        return Promise.resolve(NOTHING_OVER)
      },
    },
    { at: AT, body: PAGE_BODY }
  )

  expect(said.refused).toBeNull()
  expect(carried).toMatch(MINTED)
})
