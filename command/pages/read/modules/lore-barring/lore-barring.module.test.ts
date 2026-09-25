import { afterAll, expect, test } from "bun:test"
import { readingIn } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { INPUT, OK } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"
import { readWith } from "akasha/command/pages/read/read.command.code.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { ASKED } from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"
import {
  GAME_MASTER_SEAT,
  LORE_AT,
  loreWorld,
  OTHER_SEAT,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.test-fixtures.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

const OTHER_PAGE = "agent/seat/pages/other/other.seat.ts"

const AT_ONCE = 0

function readBy(root: string, agentId: string, argv: readonly string[], seat: string): Answer {
  const given = { root, calledAs: "akasha read", from: root, writer: null, agentId }
  return readWith(argv, given, null, () => seat, AT_ONCE)
}

test("a game master's read naming the world builder's lore is refused and records nothing", () => {
  const root = loreWorld(scratch)
  const said = readBy(root, GAME_MASTER_SEAT, ["--file-path", LORE_AT], OTHER_PAGE)
  expect(said.code).toBe(INPUT)
  expect(said.report).toEqual([])
  expect(said.refusals.join("\n")).toContain(ASKED)
  expect(said.refusals.join("\n")).not.toContain(LORE_AT)
  expect(readingIn(root, GAME_MASTER_SEAT, LORE_AT)).toBeNull()
})

test("a game master's read naming it beside another file is refused whole", () => {
  const root = loreWorld(scratch)
  const argv = ["--file-path", OTHER_PAGE, "--file-path", LORE_AT]
  const said = readBy(root, GAME_MASTER_SEAT, argv, OTHER_PAGE)
  expect(said.code).toBe(INPUT)
  expect(readingIn(root, GAME_MASTER_SEAT, OTHER_PAGE)).toBeNull()
})

test("a game master's read of a file the world builder does not hold is let through", () => {
  const root = loreWorld(scratch)
  const said = readBy(root, GAME_MASTER_SEAT, ["--file-path", OTHER_PAGE], OTHER_PAGE)
  expect(said.code).toBe(OK)
  expect(said.refusals).toEqual([])
})

test("a game master's read naming no file leaves the lore out and says so", () => {
  const root = loreWorld(scratch)
  const said = readBy(root, GAME_MASTER_SEAT, [], LORE_AT)
  expect(said.code).toBe(OK)
  expect(said.report.join("\n")).not.toContain(LORE_AT)
  expect(said.refusals.join("\n")).toContain("left out")
  expect(readingIn(root, GAME_MASTER_SEAT, LORE_AT)).toBeNull()
})

test("a seat of another role reads the world builder's lore as any file", () => {
  const root = loreWorld(scratch)
  const said = readBy(root, OTHER_SEAT, ["--file-path", LORE_AT], OTHER_PAGE)
  expect(said.code).toBe(OK)
  expect(said.report.join("\n")).toContain(`${LORE_AT} — the whole file follows`)
})
