import { afterAll, expect, test } from "bun:test"
import { markReadingsChanged } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import {
  changedLoreFor,
  changedLoreOfSeat,
} from "akasha/story/lore-disclosure/modules/lore-rereading/lore-rereading.module.code.ts"
import {
  PLACE_AT,
  readNow,
  rewritten,
  toldWorld,
} from "akasha/story/lore-disclosure/modules/lore-rereading/lore-rereading.module.test-fixtures.ts"
import {
  LORE_AT,
  OTHER_SEAT,
  TOLD_AT,
  WRITER_SEAT,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

test("a lore page the seat read that has changed since is named by its path", () => {
  const root = toldWorld(scratch)
  readNow(root, WRITER_SEAT, TOLD_AT)
  rewritten(root, TOLD_AT)
  expect(changedLoreFor(root, WRITER_SEAT)).toEqual([TOLD_AT])
})

test("a lore page unchanged since the seat read it is not named", () => {
  const root = toldWorld(scratch)
  readNow(root, WRITER_SEAT, TOLD_AT)
  expect(changedLoreFor(root, WRITER_SEAT)).toEqual([])
})

test("a lore page the seat never read is not named, though another seat read it", () => {
  const root = toldWorld(scratch)
  readNow(root, WRITER_SEAT, PLACE_AT)
  readNow(root, OTHER_SEAT, TOLD_AT)
  rewritten(root, TOLD_AT)
  expect(changedLoreFor(root, WRITER_SEAT)).toEqual([])
  expect(changedLoreFor(root, OTHER_SEAT)).toEqual([TOLD_AT])
})

test("a fresh seat, holding no reading, is named nothing", () => {
  const root = toldWorld(scratch)
  rewritten(root, TOLD_AT)
  expect(changedLoreFor(root, WRITER_SEAT)).toEqual([])
  expect(changedLoreOfSeat(root, "writing")).toEqual([])
  expect(changedLoreOfSeat(root, "no-such-seat")).toEqual([])
})

test("a reading a landing marked changed still names its page", () => {
  const root = toldWorld(scratch)
  readNow(root, WRITER_SEAT, TOLD_AT)
  rewritten(root, TOLD_AT)
  markReadingsChanged(root, [TOLD_AT])
  expect(changedLoreFor(root, WRITER_SEAT)).toEqual([TOLD_AT])
})

test("a page withheld from the seat is not named, though the seat read it", () => {
  const root = toldWorld(scratch)
  readNow(root, WRITER_SEAT, LORE_AT)
  readNow(root, OTHER_SEAT, LORE_AT)
  rewritten(root, LORE_AT)
  expect(changedLoreFor(root, WRITER_SEAT)).toEqual([])
  expect(changedLoreFor(root, OTHER_SEAT)).toEqual([LORE_AT])
})

test("a place page is lore, and a seat is found by its name", () => {
  const root = toldWorld(scratch)
  readNow(root, OTHER_SEAT, PLACE_AT)
  readNow(root, OTHER_SEAT, TOLD_AT)
  rewritten(root, PLACE_AT)
  expect(changedLoreOfSeat(root, "other")).toEqual([PLACE_AT])
})
