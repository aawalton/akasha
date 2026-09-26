import { expect, test } from "bun:test"
import {
  factsSpelled,
  GAME_MASTER,
  knowersOf,
  movedIn,
  type Source,
  secretsSpelled,
  storyOf,
} from "akasha/change/agent/page-type/move-lore-disclosure-to-facts/move-lore-disclosure-to-facts.change-agent.code.ts"
import { place } from "akasha/story/lore/place/place.page-type.ts"
import { characterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.ts"

const STORIES = ["sprig", "sprig-ii", "twig"]

const PLAYER = `${characterPlayer.slug}/sprig-hero`

const SECOND_PLAYER = `${characterPlayer.slug}/sprig-ii-hero`

const PLAYERS: ReadonlyMap<string, readonly string[]> = new Map([
  ["sprig", [PLAYER]],
  ["sprig-ii", [SECOND_PLAYER]],
])

const TARGET = `${place.slug}/grove`

function lore(slug: string, level: string, facts: readonly string[], about: string | null): Source {
  return { path: `story/lore/${slug}.lore.ts`, slug, place: false, about, level, facts }
}

test("a slug is read as the longest played story it begins with", () => {
  expect(storyOf("sprig-ii-leaf", STORIES)).toBe("sprig-ii")
  expect(storyOf("sprig-leaf", STORIES)).toBe("sprig")
  expect(storyOf("elsewhere", STORIES)).toBeNull()
})

test("each disclosure maps to the knowers of every fact it held", () => {
  expect(knowersOf(lore("a", "world-builder", [], null), STORIES, PLAYERS)).toBeNull()
  expect(knowersOf(lore("a", "wiki", [], null), STORIES, PLAYERS)).toBeNull()
  expect(knowersOf(lore("a", "game-master", [], null), STORIES, PLAYERS)).toEqual([GAME_MASTER])
  expect(knowersOf(lore("sprig-ii-a", "player", [], null), STORIES, PLAYERS)).toEqual([
    GAME_MASTER,
    SECOND_PLAYER,
  ])
})

test("lore told to players whose story has no player character is refused", () => {
  const said = knowersOf(lore("twig-a", "player", [], null), STORIES, PLAYERS)
  expect(said !== null && "refused" in said).toBe(true)
})

test("pages about one target fold into one, and no fact is lost", () => {
  const moved = movedIn(
    [
      lore("sprig-leaf", "player", ["one", "two"], TARGET),
      lore("sprig-leaf-inner", "game-master", ["three"], TARGET),
      lore("sprig-leaf-held", "world-builder", ["four"], TARGET),
    ],
    STORIES,
    PLAYERS
  )
  if ("refused" in moved) throw new Error(moved.refused)
  expect(moved.kept).toHaveLength(1)
  const kept = moved.kept[0]
  expect(kept?.path).toBe("story/lore/sprig-leaf.lore.ts")
  expect(kept?.told.map((one) => one.fact)).toEqual(["one", "two", "three"])
  expect(kept?.secrets).toEqual(["four"])
  expect(kept?.absorbed).toHaveLength(2)
  expect(moved.factsIn).toBe(4)
})

test("a fact told on one page and secret on another is told once, to every knower", () => {
  const moved = movedIn(
    [
      lore("sprig-a", "world-builder", ["same"], TARGET),
      lore("sprig-b", "player", ["same", "other"], TARGET),
    ],
    STORIES,
    PLAYERS
  )
  if ("refused" in moved) throw new Error(moved.refused)
  expect(moved.kept[0]?.told[0]).toEqual({ fact: "same", knowers: [GAME_MASTER, PLAYER] })
  expect(moved.kept[0]?.secrets).toEqual([])
  expect(moved.merged).toBe(1)
})

test("lore about a place folds into the place, which is its own lore", () => {
  const grove: Source = {
    path: "story/places/grove.place.ts",
    slug: "grove",
    place: true,
    about: null,
    level: "game-master",
    facts: ["here"],
  }
  const moved = movedIn(
    [grove, lore("about-grove", "wiki", ["hidden", "more"], TARGET)],
    STORIES,
    PLAYERS
  )
  if ("refused" in moved) throw new Error(moved.refused)
  expect(moved.kept[0]?.path).toBe(grove.path)
  expect(moved.kept[0]?.about).toBeNull()
  expect(moved.kept[0]?.secrets).toEqual(["hidden", "more"])
})

test("lore stating no target is refused", () => {
  const moved = movedIn([lore("nowhere", "wiki", ["one"], null)], STORIES, PLAYERS)
  expect("refused" in moved).toBe(true)
})

test("told facts are spelled as records, and secrets as one quoted line each", () => {
  expect(factsSpelled([{ fact: 'a "b"', knowers: [GAME_MASTER] }])).toBe(
    `[{ fact: "a \\"b\\"", knowers: ["${GAME_MASTER}"] }]`
  )
  expect(secretsSpelled(["one", "two"])).toBe('"one"\n"two"\n')
})
