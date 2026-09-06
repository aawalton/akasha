import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { answered, moving, taking, writing } from "../change-answer/change-answer.module.code.ts"
import {
  changeOver,
  NOTHING_OVER,
  type World,
  worldAt,
  worldOver,
} from "./change-shadow.module.code.ts"

afterAll(scratch.sweep)

const AT = "akasha/one/fresh.module.code.ts"

const OTHER = "akasha/one/other.module.code.ts"

const BYTES = new TextEncoder()

function worldIn(root: string): World {
  return worldAt(root, textIn(root))
}

test("a world over no answer carries an answer holding no edit", () => {
  expect(worldIn(indexedRepo()).over).toEqual(NOTHING_OVER)
})

test("a path an answer writes reads back the body that answer leaves at the path", () => {
  const root = indexedRepo()

  const world = worldOver(worldIn(root), answered([writing(AT, null, "held\n")]))

  expect(world.textOf(AT)).toBe("held\n")
})

test("a path an answer carries away reads back nothing", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""

  const world = worldOver(worldIn(root), answered([taking(HELD_CODE, was)]))

  expect(world.textOf(HELD_CODE)).toBe(null)
})

test("a path no answer names reads back the body the world beneath answers", () => {
  const root = indexedRepo()

  const world = worldOver(worldIn(root), answered([writing(AT, null, "held\n")]))

  expect(world.textOf(NAMER_CODE)).toBe(textIn(root)(NAMER_CODE))
})

test("a world built over a second answer carries both answers gathered", () => {
  const root = indexedRepo()
  const first = worldOver(worldIn(root), answered([writing(AT, null, "one\n")]))

  const world = worldOver(first, answered([writing(OTHER, null, "two\n")]))

  expect(world.over.refused).toBe(null)
  expect(world.over.edits.map((one) => one.path).sort()).toEqual([AT, OTHER])
  expect(world.textOf(AT)).toBe("one\n")
  expect(world.textOf(OTHER)).toBe("two\n")
})

test("a move empties the path it came from and fills the path it lands at", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""

  const world = worldOver(worldIn(root), answered([moving(HELD_CODE, AT, was, was)]))

  expect(world.textOf(HELD_CODE)).toBe(null)
  expect(world.textOf(AT)).toBe(was)
})

test("a path a move leaves is among the paths the change changed", () => {
  const said = answered([moving(HELD_CODE, AT, "was\n", "now\n")])

  const change = changeOver("/nowhere", said)

  expect([...change.changed]).toEqual([AT, HELD_CODE])
  expect(change.before(HELD_CODE)).toEqual(BYTES.encode("was\n"))
  expect(change.after(HELD_CODE)).toBe(null)
  expect(change.before(AT)).toBe(null)
  expect(change.after(AT)).toEqual(BYTES.encode("now\n"))
})

test("an edit stating no body leaves that path holding nothing after the change", () => {
  const change = changeOver("/nowhere", answered([taking(AT, "was\n")]))

  expect(change.before(AT)).toEqual(BYTES.encode("was\n"))
  expect(change.after(AT)).toBe(null)
})
