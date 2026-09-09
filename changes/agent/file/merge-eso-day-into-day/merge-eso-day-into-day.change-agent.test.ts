import { expect, test } from "bun:test"
import { runChange as moveFile } from "../../../mechanical/file/move/move-file/move-file.change-mechanical-file.code.ts"
import { runChange as removeFile } from "../../../mechanical/file/remove/remove-file/remove-file.change-mechanical-file.code.ts"
import { runChange as addKey } from "../../../mechanical/file-content/add/add-page-property/add-page-property.change-mechanical-file-content.code.ts"
import { pathsIn, refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import {
  bodiesIn,
  type Reaching,
  type World,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { worldOf } from "../../../modules/change-shadow/change-shadow.module.test-fixtures.ts"
import {
  mergeEsoDayIntoDay,
  mostIn,
  runChange,
} from "./merge-eso-day-into-day.change-agent.code.ts"

const MOVE_FILE = "change-mechanical-file/move-file"

const ADD_PAGE_PROPERTY = "change-mechanical-file-content/add-page-property"

const REMOVE_FILE = "change-mechanical-file/remove-file"

const RUNS: Reaching = (world, at, given) => {
  if (at === MOVE_FILE) {
    return Promise.resolve(moveFile(world, given as Parameters<typeof moveFile>[1]))
  }
  if (at === ADD_PAGE_PROPERTY) {
    return Promise.resolve(addKey(world, given as Parameters<typeof addKey>[1]))
  }
  if (at === REMOVE_FILE) {
    return Promise.resolve(removeFile(world, given as Parameters<typeof removeFile>[1]))
  }
  return Promise.resolve(refusing(`\`${at}\` is reached by nothing here`))
}

const ESO_DAYS = "alan/track/daily/eso-days/pages"

const DAYS = "alan/track/days/pages"

const HEALTH = "health-samples"

const LISTENS = "listens"

const ENTRY = `{"seq":1}\n`

function esoAt(date: string): string {
  return `${ESO_DAYS}/${date}/eso-day-${date}.eso-day.ts`
}

function esoBeside(date: string, named: string): string {
  return `${ESO_DAYS}/${date}/eso-day-${date}.eso-day.${named}.jsonl`
}

function dayAt(date: string): string {
  return `${DAYS}/${date}/day-${date}.day.ts`
}

function dayBeside(date: string, named: string): string {
  return `${DAYS}/${date}/day-${date}.day.${named}.jsonl`
}

function esoBody(date: string, said: readonly string[]): string {
  const lines = [
    `  pageTypeSlug: "eso-day",`,
    `  slug: "eso-day-${date}",`,
    `  title: "@eso-day:${date}",`,
    `  esoDay: "${date}",`,
    ...said,
  ]
  return `export const esoDay = {\n${lines.join("\n")}\n} as const satisfies EsoDay\n`
}

function dayBody(date: string): string {
  const lines = [`  pageTypeSlug: "day",`, `  slug: "day-${date}",`, `  date: "${date}"`]
  return `export const day = {\n${lines.join("\n")}\n} as const satisfies Day\n`
}

const ONE = "2026-01-01"

const TWO = "2026-01-02"

const THREE = "2026-01-03"

const GONE = "2025-12-31"

const HELD: Readonly<Record<string, string>> = {
  [esoAt(ONE)]: esoBody(ONE, [`  healthSamples: "jsonl",`]),
  [esoBeside(ONE, HEALTH)]: ENTRY,
  [dayAt(ONE)]: dayBody(ONE),
  [esoAt(TWO)]: esoBody(TWO, [`  healthSamples: "jsonl",`, `  listens: "jsonl",`]),
  [esoBeside(TWO, HEALTH)]: ENTRY,
  [esoBeside(TWO, LISTENS)]: ENTRY,
  [dayAt(TWO)]: dayBody(TWO),
  [esoAt(THREE)]: esoBody(THREE, []),
  [dayAt(THREE)]: dayBody(THREE),
}

const PAGES = [esoAt(ONE), esoAt(TWO), esoAt(THREE)]

function worldIn(
  held: Readonly<Record<string, string>>,
  pages: readonly string[],
  reaching: Reaching = RUNS
): World {
  return {
    ...worldOf(held),
    index: { everyOfType: () => pages.map((path) => ({ path, id: path })) } as never,
    reaching,
  }
}

test("a page with one file beside it moves that file onto the day of the same date", async () => {
  const world = worldIn(HELD, [esoAt(ONE)])

  const said = await mergeEsoDayIntoDay(world, {})

  expect(said.refused).toBeNull()
  expect(said.edits).toContainEqual({
    kind: "move",
    pathFrom: esoBeside(ONE, HEALTH),
    pathTo: dayBeside(ONE, HEALTH),
  })
})

test("the key naming that file is stated on the day page", async () => {
  const world = worldIn(HELD, [esoAt(ONE)])

  const said = await mergeEsoDayIntoDay(world, {})

  expect(bodiesIn(said, world.base).get(dayAt(ONE)) ?? "").toContain(`healthSamples: "jsonl"`)
})

test("the ESO day page is taken away once it is folded", async () => {
  const world = worldIn(HELD, [esoAt(ONE)])

  const said = await mergeEsoDayIntoDay(world, {})

  expect(bodiesIn(said, world.base).get(esoAt(ONE))).toBeNull()
})

test("a page with two files beside it carries both keys and both files", async () => {
  const world = worldIn(HELD, [esoAt(TWO)])

  const said = await mergeEsoDayIntoDay(world, {})

  expect(said.refused).toBeNull()
  const body = bodiesIn(said, world.base).get(dayAt(TWO)) ?? ""
  expect(body).toContain(`healthSamples: "jsonl"`)
  expect(body).toContain(`listens: "jsonl"`)
  expect(pathsIn(said)).toContain(dayBeside(TWO, LISTENS))
})

test("a page with no file beside it goes with no key stated on the day", async () => {
  const world = worldIn(HELD, [esoAt(THREE)])

  const said = await mergeEsoDayIntoDay(world, {})

  expect(said.refused).toBeNull()
  expect(said.edits).toEqual([{ kind: "remove", path: esoAt(THREE) }])
})

test("a date whose day page cannot be read is refused rather than folded", async () => {
  const held = { [esoAt(ONE)]: HELD[esoAt(ONE)] ?? "", [esoBeside(ONE, HEALTH)]: ENTRY }

  const said = await mergeEsoDayIntoDay(worldIn(held, [esoAt(ONE)]), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(dayAt(ONE))
  expect(said.refused ?? "").toContain("could not be read")
})

test("a count handed in holds how many ESO day pages this call folds", async () => {
  const world = worldIn(HELD, PAGES)

  const said = await mergeEsoDayIntoDay(world, { most: 1 })

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(esoAt(ONE))).toBeNull()
  expect(bodies.has(esoAt(TWO))).toBe(false)
})

test("a run handed no count folds every ESO day page", async () => {
  const world = worldIn(HELD, PAGES)

  const said = await mergeEsoDayIntoDay(world, {})

  const bodies = bodiesIn(said, world.base)
  expect(bodies.get(esoAt(ONE))).toBeNull()
  expect(bodies.get(esoAt(TWO))).toBeNull()
  expect(bodies.get(esoAt(THREE))).toBeNull()
})

test("an ESO day page with no body left is passed over rather than refused", async () => {
  const world = worldIn(HELD, [esoAt(GONE), ...PAGES])

  const said = await mergeEsoDayIntoDay(world, {})

  expect(said.refused).toBeNull()
  expect(pathsIn(said)).not.toContain(esoAt(GONE))
})

test("a page passed over is counted against no count", async () => {
  const world = worldIn(HELD, [esoAt(GONE), esoAt(ONE)])

  const said = await mergeEsoDayIntoDay(world, { most: 1 })

  expect(bodiesIn(said, world.base).get(esoAt(ONE))).toBeNull()
})

test("a count that is no whole number above nothing is refused", async () => {
  const said = await runChange(worldIn(HELD, PAGES), { most: "none" })

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain("is no count of pages")
})

test("a count is read as a whole number and no count is read as none", () => {
  expect(mostIn("2")).toBe(2)
  expect(mostIn(undefined)).toBeNull()
})

test("one page refused refuses the whole change, and the refusal names that page", async () => {
  const held = { ...HELD, [esoAt(TWO)]: "const two = 1\n" }

  const said = await mergeEsoDayIntoDay(worldIn(held, PAGES), {})

  expect(said.edits).toEqual([])
  expect(said.refused ?? "").toContain(esoAt(TWO))
})

test("the file moves before the key is stated, and the page goes last", async () => {
  const reached: string[] = []
  const reaching: Reaching = (world, at, given) => {
    reached.push(at)
    return RUNS(world, at, given)
  }

  await mergeEsoDayIntoDay(worldIn(HELD, [esoAt(ONE)], reaching), {})

  expect(reached).toEqual([MOVE_FILE, ADD_PAGE_PROPERTY, REMOVE_FILE])
})
