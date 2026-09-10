import { afterAll, expect, test } from "bun:test"
import {
  HELD_CODE,
  indexedRepo,
  NAMER_CODE,
  scratch,
  textIn,
} from "@akasha/indexes/indexing/testing"
import { runChange as addFile } from "../../mechanical/file/add/add-file/add-file.change-mechanical-file.code.ts"
import { runChange as removeFile } from "../../mechanical/file/remove/remove-file/remove-file.change-mechanical-file.code.ts"
import {
  beyond,
  gathered,
  pathsIn,
  refusing,
  stating,
} from "../answer/change-answer.module.code.ts"
import {
  addedTo,
  changeOver,
  isLedger,
  type Ledger,
  ledgerAt,
  NOTHING_OVER,
  type Reaching,
  reach,
  type World,
  worldAt,
  worldOver,
} from "./change-shadow.module.code.ts"
import {
  AUTHORED_AT,
  answeredOf,
  GENERATED_AT,
  IN_ORDER,
  LOOSE,
  REORDERED,
  seedsExactly,
} from "./change-shadow.module.test-fixtures.ts"

afterAll(scratch.sweep)

const AT = "akasha/one/fresh.module.code.ts"

const OTHER = "akasha/one/other.module.code.ts"

const ADD_FILE = "change-mechanical-file/add-file"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const NO_BODY = `\`${AT}\` holds no body, so nothing is taken away`

const BYTES = new TextEncoder()

const RUNS: Reaching = (world, at, given) => {
  if (at === ADD_FILE) {
    return Promise.resolve(addFile(world, given as { at: string; body: string }))
  }
  if (at === REMOVE_FILE) {
    return Promise.resolve(removeFile(world, given as { at: string }))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

function worldIn(root: string): World {
  return worldAt(root, textIn(root), RUNS)
}

function ledgerIn(root: string): Ledger {
  return ledgerAt(root, textIn(root), RUNS)
}

test("a ledger over no answer carries an answer holding no edit", () => {
  expect(ledgerIn(indexedRepo()).over).toEqual(NOTHING_OVER)
})

test("a ledger reads a path no edit names from the files beneath", () => {
  const root = indexedRepo()
  expect(ledgerIn(root).textOf(HELD_CODE)).toBe(textIn(root)(HELD_CODE))
})

test("a ledger reads back the body an edit added leaves", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: AT, content: "held\n" }]))

  expect(ledger.textOf(AT)).toBe("held\n")
})

test("a ledger reads back nothing where an edit took a path away", () => {
  const root = indexedRepo()
  const ledger = ledgerIn(root)
  addedTo(ledger, stating([{ kind: "remove", path: HELD_CODE }]))

  expect(ledger.textOf(HELD_CODE)).toBeNull()
})

test("a ledger reads back nothing at the path a move left", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""
  const ledger = ledgerIn(root)
  addedTo(ledger, stating([{ kind: "move", pathFrom: HELD_CODE, pathTo: AT }]))

  expect(ledger.textOf(HELD_CODE)).toBeNull()
  expect(ledger.textOf(AT)).toBe(was)
})

test("a ledger added to twice carries both answers gathered", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: AT, content: "one\n" }]))
  addedTo(ledger, stating([{ kind: "add", path: OTHER, content: "two\n" }]))

  expect(ledger.over).toEqual(
    gathered([
      stating([{ kind: "add", path: AT, content: "one\n" }]),
      stating([{ kind: "add", path: OTHER, content: "two\n" }]),
    ])
  )
})

const FRESH_PAGE = "akasha/one/fresh.module.ts"

const FRESH_BODY = `export const fresh = ${JSON.stringify(
  {
    id: "01a07c9a-0001-7000-8000-000000000001",
    pageTypeSlug: "module",
    slug: "fresh",
    definition: "a page an edit added",
    code: "ts",
  },
  null,
  2
)} as const\n`

test("an index a ledger answers knows the page an edit added", () => {
  const ledger = ledgerIn(indexedRepo())
  expect(ledger.index.listedAt("module", "fresh")).toEqual([])

  addedTo(ledger, stating([{ kind: "add", path: FRESH_PAGE, content: FRESH_BODY }]))

  expect(ledger.index.listedAt("module", "fresh").map((one) => one.path)).toEqual([FRESH_PAGE])
})

test("an index a ledger answers is built again where a later edit was added", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: FRESH_PAGE, content: FRESH_BODY }]))
  const first = ledger.index

  expect(ledger.index).toBe(first)

  addedTo(ledger, stating([{ kind: "add", path: OTHER, content: "two\n" }]))

  expect(ledger.index).not.toBe(first)
})

const FOLDED_EARLIER = "the first settling folded this in\n"

test("a ledger settling again folds the bodies those edits left into the settled bodies", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: FRESH_PAGE, content: FRESH_BODY }]))
  const first = ledger.index

  addedTo(ledger, stating([{ kind: "add", path: OTHER, content: "two\n" }]))
  const second = ledger.index

  expect(second).not.toBe(first)
  expect(ledger.kept.settled.get(FRESH_PAGE)).toBe(FRESH_BODY)
  expect(ledger.kept.settled.get(OTHER)).toBe("two\n")
})

test("no body an earlier settling already folded in is folded in a second time", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: FRESH_PAGE, content: FRESH_BODY }]))
  const first = ledger.index
  ledger.kept.settled.set(FRESH_PAGE, FOLDED_EARLIER)

  addedTo(ledger, stating([{ kind: "add", path: OTHER, content: "two\n" }]))
  const second = ledger.index

  expect(second).not.toBe(first)
  expect(ledger.kept.settled.get(FRESH_PAGE)).toBe(FOLDED_EARLIER)
  expect(ledger.kept.settled.get(OTHER)).toBe("two\n")
})

test("a path those edits name that the ledger replayed no body for is left out", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: FRESH_PAGE, content: FRESH_BODY }]))
  const first = ledger.index

  ledger.kept.fresh = stating([{ kind: "remove", path: HELD_CODE }])
  ledger.kept.index = null
  const second = ledger.index

  expect(second).not.toBe(first)
  expect(ledger.kept.bodies.has(HELD_CODE)).toBe(false)
  expect(ledger.kept.settled.has(HELD_CODE)).toBe(false)
})

test("a reach over a ledger adds to that ledger rather than building a second world", async () => {
  const ledger = ledgerIn(indexedRepo())
  const said = await reach(ledger, ADD_FILE as never, { at: AT, body: "held\n" })

  expect(said.said.refused).toBeNull()
  expect(said.world).toBe(ledger)
  expect(ledger.textOf(AT)).toBe("held\n")
})

test("a reach that refuses adds nothing to the ledger", async () => {
  const ledger = ledgerIn(indexedRepo())
  const said = await reach(ledger, REMOVE_FILE as never, { at: AT })

  expect(said.said.refused).toBe(NO_BODY)
  expect(said.world).toBe(ledger)
  expect(ledger.over).toEqual(NOTHING_OVER)
})

test("a ledger is told from a world built over an answer", () => {
  const root = indexedRepo()

  expect(isLedger(ledgerIn(root))).toBe(true)
  expect(isLedger(worldIn(root))).toBe(false)
  expect(
    isLedger(worldOver(worldIn(root), stating([{ kind: "add", path: AT, content: "held\n" }])))
  ).toBe(false)
})

test("a world over no answer carries an answer holding no edit", () => {
  expect(worldIn(indexedRepo()).over).toEqual(NOTHING_OVER)
})

test("a path an answer writes reads back the body that answer leaves at the path", () => {
  const root = indexedRepo()

  const world = worldOver(worldIn(root), stating([{ kind: "add", path: AT, content: "held\n" }]))

  expect(world.textOf(AT)).toBe("held\n")
})

test("a path an answer takes away reads back nothing", () => {
  const root = indexedRepo()
  const world = worldOver(worldIn(root), stating([{ kind: "remove", path: HELD_CODE }]))

  expect(world.textOf(HELD_CODE)).toBe(null)
})

test("a path no answer names reads back the body the world beneath answers", () => {
  const root = indexedRepo()

  const world = worldOver(worldIn(root), stating([{ kind: "add", path: AT, content: "held\n" }]))

  expect(world.textOf(NAMER_CODE)).toBe(textIn(root)(NAMER_CODE))
})

test("a world built over a second answer carries both answers gathered", () => {
  const root = indexedRepo()
  const first = worldOver(worldIn(root), stating([{ kind: "add", path: AT, content: "one\n" }]))

  const world = worldOver(first, stating([{ kind: "add", path: OTHER, content: "two\n" }]))

  expect(world.over.refused).toBe(null)
  expect([...pathsIn(world.over)].sort()).toEqual([AT, OTHER])
  expect(world.textOf(AT)).toBe("one\n")
  expect(world.textOf(OTHER)).toBe("two\n")
})

test("a move empties the path it came from and fills the path it lands at", () => {
  const root = indexedRepo()
  const was = textIn(root)(HELD_CODE) ?? ""

  const world = worldOver(
    worldIn(root),
    stating([{ kind: "move", pathFrom: HELD_CODE, pathTo: AT }])
  )

  expect(world.textOf(HELD_CODE)).toBe(null)
  expect(world.textOf(AT)).toBe(was)
})

test("a path a move leaves is among the paths the change changed", () => {
  const said = stating([
    { kind: "move", pathFrom: HELD_CODE, pathTo: AT },
    { kind: "replace", path: AT, contentFrom: "was\n", contentTo: "now\n" },
  ])

  const change = changeOver("/nowhere", said, (path) => (path === HELD_CODE ? "was\n" : null))

  expect([...change.changed]).toEqual([AT, HELD_CODE])
  expect(change.before(HELD_CODE)).toEqual(BYTES.encode("was\n"))
  expect(change.after(HELD_CODE)).toBe(null)
  expect(change.before(AT)).toBe(null)
  expect(change.after(AT)).toEqual(BYTES.encode("now\n"))
})

test("an edit stating no body leaves that path holding nothing after the change", () => {
  const change = changeOver("/nowhere", stating([{ kind: "remove", path: AT }]), (path) =>
    path === AT ? "was\n" : null
  )

  expect(change.before(AT)).toEqual(BYTES.encode("was\n"))
  expect(change.after(AT)).toBe(null)
})

test("a reach answers the world that reach's answer leaves beside that answer", async () => {
  const wrote = await reach(worldIn(indexedRepo()), ADD_FILE, { at: AT, body: "held\n" })

  expect(wrote.said.refused).toBe(null)
  expect(wrote.world.textOf(AT)).toBe("held\n")
  expect(pathsIn(wrote.world.over)).toEqual([AT])
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
  expect(took.said.edits).toEqual([{ kind: "remove", path: AT }])
})

test("a removal off the world an earlier reach was handed is refused", async () => {
  const world = worldIn(indexedRepo())

  const wrote = await reach(world, ADD_FILE, { at: AT, body: "held\n" })
  const took = await reach(world, REMOVE_FILE, { at: AT })

  expect(wrote.said.refused).toBe(null)
  expect(took.said.refused).toBe(NO_BODY)
})

test("a change reaching more than one change passes each world into the next reach", async () => {
  const one = await reach(worldIn(indexedRepo()), ADD_FILE, { at: AT, body: "one\n" })
  const two = await reach(one.world, ADD_FILE, { at: OTHER, body: "two\n" })
  const took = await reach(two.world, REMOVE_FILE, { at: AT })

  expect(took.said.refused).toBe(null)
  expect(took.said.edits).toEqual([{ kind: "remove", path: AT }])
  expect(took.world.textOf(AT)).toBe(null)
  expect(took.world.textOf(OTHER)).toBe("two\n")
})

test("a path an earlier reach took away is refused rather than taken away twice", async () => {
  const world = worldIn(indexedRepo())
  const gone = `\`${HELD_CODE}\` holds no body, so nothing is taken away`

  const first = await reach(world, REMOVE_FILE, { at: HELD_CODE })
  const again = await reach(first.world, REMOVE_FILE, { at: HELD_CODE })

  expect(first.said.refused).toBe(null)
  expect(again.said.refused).toBe(gone)
})

test("an answer stating an edit the world already holds states nothing beyond that world", async () => {
  const first = await reach(worldIn(indexedRepo()), REMOVE_FILE, { at: HELD_CODE })

  expect(beyond(first.world.over, first.said).edits).toEqual([])
})

const HOLDS_A_BODY = "holds a body already"

test("an edit added over a path the ledger wrote is replayed onto the body that path holds", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: AT, content: "one\n" }]))

  addedTo(ledger, stating([{ kind: "replace", path: AT, contentFrom: "one", contentTo: "two" }]))

  expect(ledger.over.edits).toEqual([
    { kind: "add", path: AT, content: "one\n" },
    { kind: "replace", path: AT, contentFrom: "one", contentTo: "two" },
  ])
  expect(ledger.textOf(AT)).toBe("two\n")
})

test("an edit that will not replay onto the ledger throws and leaves the ledger as it was", () => {
  const ledger = ledgerIn(indexedRepo())
  addedTo(ledger, stating([{ kind: "add", path: AT, content: "one\n" }]))

  expect(() => addedTo(ledger, stating([{ kind: "add", path: AT, content: "two\n" }]))).toThrow(
    HOLDS_A_BODY
  )

  expect(ledger.over.edits).toEqual([{ kind: "add", path: AT, content: "one\n" }])
  expect(ledger.textOf(AT)).toBe("one\n")
})

test("an edit that will not replay onto a world throws rather than answering", () => {
  const world = worldOver(
    worldIn(indexedRepo()),
    stating([{ kind: "add", path: AT, content: "one\n" }])
  )

  expect(() => worldOver(world, stating([{ kind: "add", path: AT, content: "two\n" }]))).toThrow(
    HOLDS_A_BODY
  )

  expect(world.over.edits).toEqual([{ kind: "add", path: AT, content: "one\n" }])
})

test("a reach inside a change states an edit the reach around that change states again", async () => {
  const root = indexedRepo()
  const around = "change-mechanical-file/add-file-around"
  const nesting: Reaching = async (world, at, given) => {
    if (at !== around) return await RUNS(world, at, given)
    return (await reach(world, ADD_FILE as never, given)).said
  }
  const ledger = ledgerAt(root, textIn(root), nesting)

  const said = await reach(ledger, around as never, { at: AT, body: "held\n" })

  expect(said.said.refused).toBeNull()
  expect(ledger.over.edits).toEqual([{ kind: "add", path: AT, content: "held\n" }])
  expect(gathered([ledger.over, said.said]).refused).toBeNull()
})

test("a generated body repointed is seeded as the generator would write it", async () => {
  await seedsExactly(LOOSE, REORDERED)
})

test("a generated body needing no reordering is seeded with the order it had", async () => {
  await seedsExactly(IN_ORDER, IN_ORDER)
})

test("a generated body repointed is named by no edit the answer carries", async () => {
  expect(await answeredOf(LOOSE, GENERATED_AT)).toBe(0)
})

test("a body that is generated by nothing is answered rather than seeded", async () => {
  expect(await answeredOf(LOOSE, AUTHORED_AT)).toBe(1)
})
