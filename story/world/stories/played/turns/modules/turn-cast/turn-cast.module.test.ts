import { expect, test } from "bun:test"
import {
  type Character,
  castKept,
  unlistedIn,
  unlistedRefused,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"

const NALA = "character-player/saga-nala"

const ALDO = "character-other/saga-aldo-reeve"

const CAST: readonly Character[] = [
  { address: NALA, title: "Nala", aliasOf: null },
  { address: ALDO, title: "Aldo Reeve", aliasOf: null },
]

test("a character the prose names by whole title or first name and the advance leaves out is found", () => {
  expect(unlistedIn('"Aldo Reeve. Headman." Nala nods.', [NALA], CAST)).toEqual([ALDO])
  expect(unlistedIn("Nala finds Aldo threshing.", [NALA], CAST)).toEqual([ALDO])
  expect(unlistedIn("Nala finds Aldo threshing.", [NALA, ALDO], CAST)).toEqual([])
})

test("a name inside another word, or in another case, is no naming", () => {
  expect(unlistedIn("Nala meets the Aldoran envoy.", [NALA], CAST)).toEqual([])
  expect(unlistedIn("Nala hears ALDO shouted.", [NALA], CAST)).toEqual([])
})

test("a title the prose also has as a common word is passed over", () => {
  const cast = [...CAST, { address: "character-other/saga-will", title: "Will", aliasOf: null }]
  expect(unlistedIn("Will you come? Nala will.", [NALA], cast)).toEqual([])
  expect(unlistedIn("Will waits by the gate.", [NALA], cast)).toEqual(["character-other/saga-will"])
})

test("an alias listed covers the character it is read as, and an alias named asks for that character", () => {
  const cast = [
    ...CAST,
    { address: "character-other/saga-headman", title: "Headman", aliasOf: ALDO },
  ]
  expect(unlistedIn("The Headman waits.", [NALA], cast)).toEqual([ALDO])
  expect(unlistedIn("Aldo waits.", ["character-other/saga-headman"], cast)).toEqual([])
})

const TURN_AT = "stories/saga/turns/saga-00-015.story-turn-played.ts"

const PROSE_AT = "stories/saga/turns/saga-00-015.story-turn-played.prose.txt"

function textOf(prose: string): (path: string) => string {
  return (path) => {
    if (path !== PROSE_AT) throw new Error(`${path} is not there`)
    return prose
  }
}

test("a character filed after the prose, which the prose names, is added to the turn's list", () => {
  const turn = { at: TURN_AT, value: { prose: "txt", characters: [NALA] } }
  expect(castKept(turn, CAST, textOf("Nala finds Aldo threshing."))).toEqual({
    characters: [NALA, ALDO],
  })
})

test("a turn whose list already holds every character its prose names is left as it is", () => {
  const turn = { at: TURN_AT, value: { prose: "txt", characters: [NALA, ALDO] } }
  expect(castKept(turn, CAST, textOf("Nala finds Aldo threshing."))).toEqual({})
})

test("a turn with no prose, or a prose file that is not there, adds no character", () => {
  expect(castKept({ at: TURN_AT, value: {} }, CAST, textOf("Aldo."))).toEqual({})
  const elsewhere = { at: "stories/saga/turns/other.story-turn-played.ts", value: { prose: "txt" } }
  expect(castKept(elsewhere, CAST, textOf("Aldo."))).toEqual({})
})

test("the refusal names each missing character by its address and quotes no prose", () => {
  const said = unlistedRefused("Nala finds Aldo threshing.", [NALA], CAST)
  expect(said).toContain(ALDO)
  expect(said).toContain("--character")
  expect(said).not.toContain("threshing")
  expect(unlistedRefused("Nala waits.", [NALA], CAST)).toBeNull()
})
