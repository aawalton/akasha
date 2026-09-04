import { afterAll, expect, test } from "bun:test"
import { mkdirSync } from "node:fs"
import { join } from "node:path"
import { put, there } from "@akasha/testing-system/putting"
import { move } from "../move.command.code.ts"
import {
  bareDir,
  bodyIn,
  FOLDER,
  FOLDER_AT,
  FOLDER_PAIR,
  folderUnsaid,
  folderWorld,
  git,
  givenIn,
  HELD,
  HELD_AT,
  HOLDER,
  HOLDER_AT,
  head,
  LOOSE,
  NESTED_AT,
  NESTED_HELD,
  OTHER,
  PAGE,
  scratch,
  told,
  UNSAID,
  UNSAID_UNDER,
  VALUES,
} from "../move.command.test-fixtures.ts"
import type { Spread, Spreading } from "./move-spreading.module.code.ts"
import { expandedIn, othersUnder, spreadSaid } from "./move-spreading.module.code.ts"

afterAll(scratch.sweep)

function opened(root: string, from: string, to: string): Spreading {
  return expandedIn(root, [{ from, to }])
}

function refused(said: Spreading): string {
  return "refusals" in said ? said.refusals.join("\n") : ""
}

function spread(said: Spreading): Spread {
  if ("refusals" in said) throw new Error(said.refusals.join("\n"))
  return said
}

test("a pair naming a file is handed back as it was given", () => {
  const said = spread(opened(folderWorld(), HELD, "akasha/three/held.module.ts"))
  expect(said.pairs).toEqual([{ from: HELD, to: "akasha/three/held.module.ts" }])
  expect(said.folders).toEqual([])
  expect([...said.under]).toEqual([])
})

test("a pair naming a path outside the akasha folder is handed back untouched", () => {
  const said = spread(opened(folderWorld(), "elsewhere/held.ts", "akasha/three/held.ts"))
  expect(said.pairs).toEqual([{ from: "elsewhere/held.ts", to: "akasha/three/held.ts" }])
  expect(said.folders).toEqual([])
})

test("a pair naming a path that is not there is handed back for the move to refuse", () => {
  const said = spread(opened(folderWorld(), "akasha/nowhere.module.ts", "akasha/three/gone.ts"))
  expect(said.pairs.length).toBe(1)
  expect(said.folders).toEqual([])
})

test("a folder becomes one pair for every file git holds under it", () => {
  const said = spread(opened(folderWorld(), FOLDER, FOLDER_AT))
  expect(said.pairs).toEqual([
    { from: HELD, to: HELD_AT },
    { from: NESTED_HELD, to: NESTED_AT },
  ])
  expect(said.folders).toEqual([{ from: FOLDER, to: FOLDER_AT }])
  expect([...said.under].sort()).toEqual([HELD, HOLDER, NESTED_HELD].sort())
})

test("a file beside a page is left out, since the move pulls it in by the page", () => {
  const said = spread(opened(folderWorld(), FOLDER, FOLDER_AT))
  expect(said.pairs.map((one) => one.from)).not.toContain(HOLDER)
  expect(said.under.has(HOLDER)).toBe(true)
})

test("a folder arriving where something is already there is refused", () => {
  expect(refused(opened(folderWorld(), FOLDER, "akasha/two"))).toContain(
    "names the path it becomes"
  )
})

test("a folder git holds no file under is refused", () => {
  const root = folderWorld()
  bareDir(root, "akasha/bare")
  expect(refused(opened(root, "akasha/bare", "akasha/far/bare"))).toContain("holds no file under")
})

test("a folder holding a file git does not track is refused", () => {
  const root = folderWorld()
  put(root, LOOSE, OTHER)
  const said = refused(opened(root, FOLDER, FOLDER_AT))
  expect(said).toContain("git does not track")
  expect(said).toContain(LOOSE)
})

test("a sidecar git is told to ignore draws no refusal, being no file left behind", () => {
  const root = folderUnsaid()
  expect(othersUnder(root, FOLDER)).toEqual([])
  expect("refusals" in opened(root, FOLDER, FOLDER_AT)).toBe(false)
})

test("a folder carries the sidecar git is told to ignore to the folder it arrives in", () => {
  const root = folderUnsaid()
  const said = move(FOLDER_PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(there(root, UNSAID)).toBe(false)
  expect(bodyIn(root, UNSAID_UNDER)).toBe(VALUES)
})

test("one refusal stops the whole call rather than the pair that drew it", () => {
  const root = folderWorld()
  bareDir(root, "akasha/bare")
  const said = expandedIn(root, [
    { from: FOLDER, to: FOLDER_AT },
    { from: "akasha/bare", to: "akasha/far/bare" },
  ])
  expect("refusals" in said).toBe(true)
  expect(refused(said)).toContain("holds no file under")
})

test("git is asked what it does not track, and says nothing where it tracks all of it", () => {
  const root = folderWorld()
  expect(othersUnder(root, FOLDER)).toEqual([])
  put(root, LOOSE, OTHER)
  expect(othersUnder(root, FOLDER)).toEqual([LOOSE])
})

test("a folder git cannot be asked about is refused rather than read as holding nothing", () => {
  const root = scratch.rootFor("akasha-unasked-")
  mkdirSync(join(root, FOLDER), { recursive: true })
  expect(refused(opened(root, FOLDER, FOLDER_AT))).toContain("git could not say")
})

test("a spread is said as its folders, a count of what went under them, and what emptied", () => {
  const said = spreadSaid(
    { pairs: [], under: new Set([HELD]), folders: [{ from: FOLDER, to: FOLDER_AT }] },
    1,
    [FOLDER],
    false
  )
  expect(said).toEqual([
    `${FOLDER} moved to ${FOLDER_AT}`,
    "1 file under a folder you named went with it",
    `these were left empty and went, since git holds no empty folder — ${FOLDER}`,
  ])
})

test("a dry spread says the same in the tense of what would happen", () => {
  const said = spreadSaid(
    { pairs: [], under: new Set([HELD, NESTED_HELD]), folders: [{ from: FOLDER, to: FOLDER_AT }] },
    2,
    [FOLDER],
    true
  )
  expect(said).toEqual([
    `${FOLDER} would move to ${FOLDER_AT}`,
    "2 files under a folder you named would go with it",
    `these would be left empty and would go, since git holds no empty folder — ${FOLDER}`,
  ])
})

test("a spread carrying no folder says nothing at all", () => {
  expect(spreadSaid({ pairs: [], under: new Set(), folders: [] }, 0, [], false)).toEqual([])
})

test("a folder named for a move carries every file under it and lands as one commit", () => {
  const root = folderWorld()
  const was = head(root)
  const said = move(FOLDER_PAIR, givenIn(root))
  expect(said.refusals).toEqual([])
  expect(said.report[0]).toBe(`${FOLDER} moved to ${FOLDER_AT}`)
  expect(told(said)).toContain("3 files under a folder you named went with it")
  expect(told(said)).toContain("git holds no empty folder")
  expect(bodyIn(root, HELD_AT)).toBe(PAGE)
  expect(there(root, HOLDER_AT)).toBe(true)
  expect(there(root, NESTED_AT)).toBe(true)
  expect(there(root, FOLDER)).toBe(false)
  expect(bodyIn(root, HOLDER_AT)).toContain('from "../../two/other.module.code.ts"')
  expect(git(root, ["rev-list", "--count", `${was}..HEAD`]).trim()).toBe("1")
})

test("a dry run over a folder names it and carries nothing", () => {
  const root = folderWorld()
  const was = head(root)
  const said = move([...FOLDER_PAIR, "--dry-run"], givenIn(root))
  expect(said.refusals).toEqual([])
  expect(told(said)).toContain(`${FOLDER} would move to ${FOLDER_AT}`)
  expect(told(said)).toContain("under a folder you named would go with it")
  expect(told(said)).toContain("would be left empty")
  expect(there(root, FOLDER_AT)).toBe(false)
  expect(there(root, HELD)).toBe(true)
  expect(head(root)).toBe(was)
})
