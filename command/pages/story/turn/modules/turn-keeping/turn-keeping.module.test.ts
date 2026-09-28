import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  type FileChange,
  replayed,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  appendEdits,
  editsIn,
} from "akasha/change/modules/edits-keeping/edits-keeping.module.code.ts"
import {
  droppedBeside,
  fittingOf,
  heldForTurn,
  liftedFrom,
  narrowed,
  withoutRows,
} from "akasha/command/pages/story/turn/modules/turn-keeping/turn-keeping.module.code.ts"

const AT = "stories/the-saga/turns/the-saga-00-003.story-turn-played.ts"

const TEXT = `export const theSaga00003 = {
  slug: "the-saga-00-003",
  recordedBy: ["story-recorder/cast"],
} as const
`

const HALL: FileChange = { kind: "add", path: "lore/a-hall.lore.ts", content: "cast\n" }

const GATE: FileChange = { kind: "add", path: "lore/the-gate.lore.ts", content: "memory\n" }

const ENDED: FileChange = {
  kind: "replace",
  path: AT,
  contentFrom: `  recordedBy: ["story-recorder/cast"],\n`,
  contentTo: `  recordedBy: ["story-recorder/cast"],\n  endsAt: "2026-09-26T09:05:00.000Z",\n`,
}

test("rows taken away leave the rest in their order, one copy for each row taken", () => {
  const copy = { ...GATE }
  expect(withoutRows([HALL, GATE, copy], [GATE])).toEqual([HALL, GATE])
  expect(withoutRows([HALL, GATE], [ENDED])).toEqual([HALL, GATE])
})

test("a kept edit to the turn's own page is lifted into values and leaves the rest kept", () => {
  const turn = { at: AT, value: { recordedBy: ["story-recorder/cast"] } }
  const lifted = liftedFrom(turn, [HALL, ENDED, GATE], () => TEXT)
  expect(lifted).toEqual({ values: { endsAt: "2026-09-26T09:05:00.000Z" }, rest: [HALL, GATE] })
})

test("a kept edit to the turn's own page that no longer fits it is refused", () => {
  const turn = { at: AT, value: {} }
  const stale = { ...ENDED, contentFrom: `  lore: ["world-place/the-hall"],\n` }
  const lifted = liftedFrom(turn, [stale], () => TEXT)
  expect("refused" in lifted ? lifted.refused : "").toContain("no longer fits")
})

const PLACE_AT = "places/a-park.place.ts"

const TURN_AT = "stories/s/turns/s-00-001.story-turn-played.ts"

function placeOf(facts: readonly string[]): string {
  const lines = facts.map((one) => `    { fact: "${one}" },`)
  return ["export const aPark = {", "  facts: [", ...lines, "  ],", "} as const", ""].join("\n")
}

function wholeAdding(facts: readonly string[], added: string): FileChange {
  const contentFrom = placeOf(facts)
  return { kind: "replace", path: PLACE_AT, contentFrom, contentTo: placeOf([...facts, added]) }
}

function bodyOf(text: string): (path: string) => string | null {
  return (path) => (path === PLACE_AT ? text : null)
}

function rootHolding(text: string): string {
  const root = mkdtempSync(join("/var/tmp", "turn-keeping-test-"))
  mkdirSync(join(root, dirname(PLACE_AT)), { recursive: true })
  writeFileSync(join(root, PLACE_AT), text)
  return root
}

test("whole-page edits drafted before another change landed are re-derived onto the page now", () => {
  const drafted = [
    wholeAdding(["one", "two"], "three"),
    wholeAdding(["one", "two", "three"], "four"),
  ]
  const now = placeOf(["zero", "one", "two, since changed"])
  const fitting = fittingOf(drafted, bodyOf(now))
  expect(fitting.fits).toEqual(["rederived", "rederived"])
  const played = replayed(stating(fitting.rows), bodyOf(now))
  const body = "refused" in played ? played.refused : played.get(PLACE_AT)
  expect(body).toBe(placeOf(["zero", "one", "two, since changed", "three", "four"]))
})

test("a kept edit whose new lines the page holds already goes rather than landing twice", () => {
  const fitting = fittingOf(
    [HALL, wholeAdding(["one", "two"], "three")],
    bodyOf(placeOf(["one", "two", "three"]))
  )
  expect(fitting).toEqual({ rows: [HALL], fits: ["fits"], landed: 1 })
})

test("a kept edit whose own lines changed fits nothing and is left as it was", () => {
  const drafted = [HALL, wholeAdding(["one", "two"], "three")]
  const fitting = fittingOf(drafted, bodyOf("no facts here\n"))
  expect(fitting.rows).toBe(drafted)
  expect(typeof fitting.fits[1]).toBe("object")
})

test("rows taken away match a row kept as re-derived", () => {
  const drafted = wholeAdding(["one", "two"], "three")
  const narrow = narrowed(drafted)
  expect(narrow).not.toBeNull()
  expect(withoutRows(narrow === null ? [] : [narrow], [drafted])).toEqual([])
})

test("the edits kept beside a turn are kept as re-derived once every one fits", () => {
  const root = rootHolding(placeOf(["zero", "one", "two"]))
  const drafted = wholeAdding(["one", "two"], "three")
  appendEdits(root, TURN_AT, [drafted])
  const narrow = narrowed(drafted) ?? drafted
  expect(narrow).not.toBe(drafted)
  expect(heldForTurn(root, TURN_AT)).toEqual([narrow])
  expect(editsIn(root, TURN_AT)).toEqual({ rows: [narrow] })
})

test("a kept edit fitting nothing is named with the call dropping it, and a drop takes it", () => {
  const root = rootHolding("no facts here\n")
  const drafted = wholeAdding(["one", "two"], "three")
  appendEdits(root, TURN_AT, [HALL, drafted])
  const held = heldForTurn(root, TURN_AT)
  const why = "refused" in held ? held.refused : ""
  expect(why).toContain("kept edit 2 beside")
  expect(why).toContain("`akasha story turn kept drop --turn s-00-001 --record 2`")
  expect(droppedBeside(root, TURN_AT, 2)).toEqual({ went: drafted, left: 1 })
  expect(heldForTurn(root, TURN_AT)).toEqual([HALL])
  expect("refused" in droppedBeside(root, TURN_AT, 5)).toBe(true)
})
