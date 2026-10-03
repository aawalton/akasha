import { expect, test } from "bun:test"
import {
  cachedOf,
  type Knowing,
  type Paged,
  type Scened,
  scenedOf,
  scenesSettled,
} from "akasha/command/pages/story/turn/advance/modules/turn-scenes/turn-scenes.module.code.ts"
import {
  type BeatScene,
  plannedIn,
} from "akasha/story/engine/beat-state/modules/beat-replay/beat-replay.module.code.ts"

const MARA = "character-player/mara"

const CERI = "character-other/ceri"

const HALL = "place/a-hall"

const GATE = "place/the-gate"

const KNOWN: Knowing = { character: () => true, place: (address) => address !== "place/nowhere" }

function scenesOf(lines: readonly string[]): readonly BeatScene[] {
  const planned = plannedIn(lines)
  if ("refused" in planned) throw new Error(planned.refused)
  return planned.scenes
}

const EARLIER: Paged = {
  slug: "saga-00-001",
  value: {
    position: 1,
    beats: ["Mara reaches the hall"],
    beatScenes: [{ beat: 1, at: "2026-01-01T09:00:00.000Z", place: HALL, present: [MARA, CERI] }],
  },
}

const LATER: Paged = {
  slug: "saga-00-003",
  value: { position: 3, beats: ["Mara sleeps"], endsAt: "2026-01-09T09:00:00.000Z" },
}

const TURN = { at: "saga-00-002.story-turn-played.ts", slug: "saga-00-002", value: { position: 2 } }

function settled(said: Scened | { readonly refused: string }): Scened {
  if ("refused" in said) throw new Error(said.refused)
  return said
}

test("a turn's scenes replay on the story's earlier beats, caching its end time and who moved", () => {
  const scenes = scenesOf([
    JSON.stringify({ event: "Mara walks out", at: "2026-01-01T10:00:00Z", place: GATE }),
  ])
  const said = settled(scenesSettled([EARLIER, LATER], TURN, ["x"], scenes, KNOWN, false))
  expect(said.values).toEqual({ endsAt: "2026-01-01T10:00:00.000Z" })
  expect(said.namings).toEqual([
    { pageTypeSlug: "character-player", slug: "mara", merge: true, values: { place: GATE } },
    { pageTypeSlug: "character-other", slug: "ceri", merge: true, values: { place: GATE } },
  ])
})

test("a chapter's scenes cache every placed character's place and no end time", () => {
  const scenes = scenesOf([
    JSON.stringify({ event: "a", at: "2026-01-02T10:00:00Z", leave: [CERI] }),
  ])
  const said = settled(scenesSettled([EARLIER], TURN, ["x"], scenes, KNOWN, true))
  expect(said.values).toEqual({})
  expect(said.namings.map((one) => [one.slug, one.values])).toEqual([
    ["mara", { place: HALL }],
    ["ceri", { place: HALL }],
  ])
})

test("a mend that keeps a character where she was caches her old place again", () => {
  const scenes = scenesOf([JSON.stringify({ event: "Mara stays", at: "2026-01-01T10:00:00Z" })])
  const said = settled(scenesSettled([EARLIER], TURN, ["x"], scenes, KNOWN, false))
  expect(said.namings[0]?.values).toEqual({ place: HALL })
})

test("only a game master's beats stating a scene reach the scenes at all", () => {
  const asked: string[] = []
  const scening = () => {
    asked.push("asked")
    return { values: { endsAt: "2026-01-01T10:00:00.000Z" }, namings: [] }
  }
  const held = { game: "saga", status: "game-master", lore: [], issues: [] } as const
  const whole = { ...held, reviewedBy: [], recordedBy: [], written: false }
  const plain = { kind: "beats", beats: ["Mara waits"], scenes: [] } as const
  expect(scenedOf(scening, "root", whole, TURN, plain)).toEqual({ values: {}, namings: [] })
  const lore = { kind: "lore", lore: [] } as const
  expect(scenedOf(scening, "root", whole, TURN, lore)).toEqual({ values: {}, namings: [] })
  const timed = { ...plain, scenes: [{ beat: 1, at: "2026-01-01T10:00:00.000Z" }] }
  expect(settled(scenedOf(scening, "root", whole, TURN, timed)).values).toEqual({
    endsAt: "2026-01-01T10:00:00.000Z",
  })
  expect(asked).toEqual(["asked"])
})

test("each cached place is folded, and a refused fold refuses the whole", () => {
  const naming = { pageTypeSlug: "character-player", slug: "mara", merge: true, values: {} }
  const scened = { values: {}, namings: [naming, { ...naming, slug: "ceri" }] }
  const folded = cachedOf(() => [{ at: "put" }] as never, "root", scened)
  expect(folded).toHaveLength(2)
  const refused = cachedOf(() => ({ refused: "no" }), "root", scened)
  expect(refused).toEqual({ refused: "no" })
})

test("a clock running back past the story's earlier beats is refused", () => {
  const scenes = scenesOf([JSON.stringify({ event: "a", at: "2025-12-31T10:00:00Z" })])
  const said = scenesSettled([EARLIER], TURN, ["x"], scenes, KNOWN, false)
  expect("refused" in said ? said.refused : "").toContain("never runs back")
})

test("a place no page is, is refused before anything replays", () => {
  const scenes = scenesOf([JSON.stringify({ event: "a", place: "place/nowhere" })])
  const said = scenesSettled([EARLIER], TURN, ["x"], scenes, KNOWN, false)
  expect("refused" in said ? said.refused : "").toContain("`place/nowhere` as its place")
})
