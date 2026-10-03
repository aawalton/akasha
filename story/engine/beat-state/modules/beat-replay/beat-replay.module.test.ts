import { expect, test } from "bun:test"
import {
  type Played,
  plannedIn,
  replayed,
  type Scene,
  scenesIn,
  unnamedIn,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"

const OPENING: Scene = { at: null, place: null, present: [], placeOf: {} }

const MARA = "character-player/mara"

const CERI = "character-other/ceri"

const HALL = "place/a-hall"

const GATE = "place/the-gate"

function stateOf(said: Scene | { readonly refused: string }): Scene {
  if ("refused" in said) throw new Error(said.refused)
  return said
}

function refusalOf(said: Scene | { readonly refused: string }): string {
  if (!("refused" in said)) throw new Error("replayed")
  return said.refused
}

function turnOf(turn: string, lines: readonly string[], endsAt?: string): Played {
  const planned = plannedIn(lines)
  if ("refused" in planned) throw new Error(planned.refused)
  return { turn, ...planned, ...(endsAt === undefined ? {} : { endsAt }) }
}

test("plain lines are beats with no scene, and a record's event is its beat", () => {
  const record = JSON.stringify({ event: "Mara reaches the hall", place: HALL, arrive: [MARA] })
  expect(plannedIn(["Mara waits", record])).toEqual({
    beats: ["Mara waits", "Mara reaches the hall"],
    scenes: [{ beat: 2, place: HALL, arrive: [MARA] }],
  })
})

test("a record stating a key no beat states, or no event, is refused by its place", () => {
  const stray = JSON.stringify({ event: "Mara waits", mood: "grim" })
  expect(plannedIn(["one", stray])).toEqual({
    refused: "beat 2 states `mood`, and a beat states event, at, place, present, arrive, leave",
  })
  expect(plannedIn([JSON.stringify({ place: HALL })])).toEqual({
    refused: "beat 1 states no `event`",
  })
  expect(plannedIn(["{ not json"])).toEqual({
    refused: "beat 1 opens as a record and is no json object",
  })
})

test("replaying a story's turns in order moves its clock, its place and who is there", () => {
  const first = turnOf("t1", [
    JSON.stringify({ event: "a", at: "2026-01-01T09:00:00Z", place: HALL, present: [MARA] }),
    JSON.stringify({ event: "b", arrive: [CERI] }),
  ])
  const second = turnOf("t2", [
    JSON.stringify({ event: "c", at: "2026-01-01T10:00:00Z", leave: [CERI], place: GATE }),
  ])
  expect(stateOf(replayed(OPENING, [first, second]))).toEqual({
    at: "2026-01-01T10:00:00.000Z",
    place: GATE,
    present: [MARA],
    placeOf: { [MARA]: GATE, [CERI]: HALL },
  })
})

test("a clock running back is refused, naming the beat and the turn", () => {
  const first = turnOf("t1", [JSON.stringify({ event: "a", at: "2026-01-01T09:00:00Z" })])
  const back = turnOf("t2", [JSON.stringify({ event: "b", at: "2026-01-01T08:00:00Z" })])
  expect(refusalOf(replayed(OPENING, [first, back]))).toContain("beat 1 of `t2`")
  expect(refusalOf(replayed(OPENING, [first, back]))).toContain("never runs back")
})

test("arriving where already there, leaving where not there, or both at once is refused", () => {
  const set = JSON.stringify({ event: "a", place: HALL, present: [MARA] })
  const again = turnOf("t", [set, JSON.stringify({ event: "b", arrive: [MARA] })])
  expect(refusalOf(replayed(OPENING, [again]))).toContain("there already")
  const away = turnOf("t", [set, JSON.stringify({ event: "b", leave: [CERI] })])
  expect(refusalOf(replayed(OPENING, [away]))).toContain("not there")
  const both = turnOf("t", [JSON.stringify({ event: "b", arrive: [CERI], leave: [CERI] })])
  expect(refusalOf(replayed(OPENING, [both]))).toContain("arrive and leave at once")
})

test("someone there before any place is named is refused", () => {
  const nowhere = turnOf("t", [JSON.stringify({ event: "a", present: [MARA] })])
  expect(refusalOf(replayed(OPENING, [nowhere]))).toContain("no beat has named the place")
})

test("a turn stating no time keeps the time its end states, until its beats state one", () => {
  const untimed = turnOf("t1", ["Mara waits"], "2026-01-01T09:00:00Z")
  const back = turnOf("t2", [JSON.stringify({ event: "b", at: "2026-01-01T08:00:00Z" })])
  expect(stateOf(replayed(OPENING, [untimed])).at).toBe("2026-01-01T09:00:00Z")
  expect(refusalOf(replayed(OPENING, [untimed, back]))).toContain("never runs back")
})

test("a record's time is kept as an instant, and a time that is none is refused", () => {
  const said = plannedIn([JSON.stringify({ event: "a", at: "2026-01-01T10:00:00+01:00" })])
  expect(said).toEqual({ beats: ["a"], scenes: [{ beat: 1, at: "2026-01-01T09:00:00.000Z" }] })
  expect(plannedIn([JSON.stringify({ event: "a", at: "teatime" })])).toEqual({
    refused: "beat 1 states its time as `teatime`, which is no time",
  })
})

test("scenes kept on a turn read back as they were handed in, and a stray record is passed over", () => {
  const kept = [{ beat: 2, at: "2026-01-01T09:00:00.000Z", place: HALL }, { place: GATE }, "x"]
  expect(scenesIn(kept)).toEqual([{ beat: 2, at: "2026-01-01T09:00:00.000Z", place: HALL }])
  expect(scenesIn(undefined)).toEqual([])
})

test("a place or character no page is, is named by its beat", () => {
  const planned = plannedIn([JSON.stringify({ event: "a", place: GATE, arrive: [CERI] })])
  if ("refused" in planned) throw new Error(planned.refused)
  const known = (address: string) => address !== CERI
  expect(unnamedIn(planned.scenes, known, () => false)).toContain("`place/the-gate` as its place")
  expect(unnamedIn(planned.scenes, known, () => true)).toContain("`character-other/ceri`")
  expect(
    unnamedIn(
      planned.scenes,
      () => true,
      () => true
    )
  ).toBeNull()
})
