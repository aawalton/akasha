import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { addFile } from "../../mechanical/pages/add-file/add-file.change-mechanical.code.ts"
import { removeFile } from "../../mechanical/pages/remove-file/remove-file.change-mechanical-file.code.ts"
import {
  answered,
  gathered,
  moving,
  refusing,
  taking,
  writing,
} from "../change-answer/change-answer.module.code.ts"
import {
  changeOver,
  NOTHING_OVER,
  type Reaching,
  reach,
  type World,
  worldAt,
  worldOver,
} from "./change-shadow.module.code.ts"

afterAll(scratch.sweep)

const AT = "akasha/one/fresh.module.code.ts"

const OTHER = "akasha/one/other.module.code.ts"

const ADD_FILE = "change-mechanical/add-file"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const NO_BODY = `\`${AT}\` holds no body, so a removal takes nothing away`

const BYTES = new TextEncoder()

const RUNS: Reaching = (world, at, given) => {
  if (at === ADD_FILE) {
    return Promise.resolve(addFile(world, given as { at: string; body: string }))
  }
  if (at === REMOVE_FILE) {
    return Promise.resolve(removeFile(given as { at: string }, world.textOf))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
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

test("a reach answers the world that reach's answer leaves beside that answer", async () => {
  const wrote = await reach(worldIn(indexedRepo()), ADD_FILE, { at: AT, body: "held\n" })

  expect(wrote.said.refused).toBe(null)
  expect(wrote.world.textOf(AT)).toBe("held\n")
  expect(wrote.world.over.edits.map((one) => one.path)).toEqual([AT])
})

test("a reach coming back refused answers the world that reach was handed", async () => {
  const world = worldIn(indexedRepo())

  const took = await reach(world, REMOVE_FILE, { at: AT })

  expect(took.said.refused).toBe(NO_BODY)
  expect(took.world).toBe(world)
})

test("a path one reach writes is taken away by a later reach", async () => {
  const world = worldIn(indexedRepo())

  const wrote = await reach(world, ADD_FILE, { at: AT, body: "held\n" })
  const took = await reach(wrote.world, REMOVE_FILE, { at: AT })

  expect(wrote.said.refused).toBe(null)
  expect(took.said.refused).toBe(null)
  expect(took.said.edits).toEqual([{ path: AT, was: "held\n", body: null }])
})

test("a removal off the world an earlier reach was handed is refused", async () => {
  const world = worldIn(indexedRepo())

  const wrote = await reach(world, ADD_FILE, { at: AT, body: "held\n" })
  const took = await reach(world, REMOVE_FILE, { at: AT })

  expect(wrote.said.refused).toBe(null)
  expect(took.said.refused).toBe(NO_BODY)
})

test("a change reaching more than one change carries each world into the next reach", async () => {
  const one = await reach(worldIn(indexedRepo()), ADD_FILE, { at: AT, body: "one\n" })
  const two = await reach(one.world, ADD_FILE, { at: OTHER, body: "two\n" })
  const took = await reach(two.world, REMOVE_FILE, { at: AT })

  expect(took.said.refused).toBe(null)
  expect(took.said.edits).toEqual([{ path: AT, was: "one\n", body: null }])
  expect(took.world.textOf(AT)).toBe(null)
  expect(took.world.textOf(OTHER)).toBe("two\n")
})

test("a path an earlier reach took away is refused rather than taken away twice", async () => {
  const world = worldIn(indexedRepo())
  const gone = `\`${HELD_CODE}\` holds no body, so a removal takes nothing away`

  const first = await reach(world, REMOVE_FILE, { at: HELD_CODE })
  const again = await reach(first.world, REMOVE_FILE, { at: HELD_CODE })
  const twice = await reach(world, REMOVE_FILE, { at: HELD_CODE })

  expect(first.said.refused).toBe(null)
  expect(again.said.refused).toBe(gone)
  expect(twice.said.refused).toBe(null)
  expect(gathered([first.said, twice.said]).refused).toBe(
    `\`${HELD_CODE}\` is answered twice, the second from a body the first left`
  )
})
