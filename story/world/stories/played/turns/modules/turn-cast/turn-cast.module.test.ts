import { expect, test } from "bun:test"
import {
  type Admitted,
  type Character,
  castKept,
  listedRefused,
  unlistedIn,
  unlistedRefused,
} from "akasha/story/world/stories/played/turns/modules/turn-cast/turn-cast.module.code.ts"

const NALA = "character-player/saga-nala"

const ALDO = "character-other/saga-aldo-reeve"

const CAST: readonly Character[] = [
  { address: NALA, title: "Nala", aliasOf: null },
  { address: ALDO, title: "Aldo Reeve", aliasOf: null },
]

const ADMITTED: Admitted = {
  types: ["world-character", "character-player", "character-other"],
  filed: (address) => !address.endsWith("-nobody"),
}

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
  expect(castKept(turn, CAST, textOf("Nala finds Aldo threshing."), ADMITTED)).toEqual({
    characters: [NALA, ALDO],
  })
})

test("a turn whose list already holds every character its prose names is left as it is", () => {
  const turn = { at: TURN_AT, value: { prose: "txt", characters: [NALA, ALDO] } }
  expect(castKept(turn, CAST, textOf("Nala finds Aldo threshing."), ADMITTED)).toEqual({})
})

test("a turn with no prose, or a prose file that is not there, adds no character", () => {
  expect(castKept({ at: TURN_AT, value: {} }, CAST, textOf("Aldo."), ADMITTED)).toEqual({})
  const elsewhere = { at: "stories/saga/turns/other.story-turn-played.ts", value: { prose: "txt" } }
  expect(castKept(elsewhere, CAST, textOf("Aldo."), ADMITTED)).toEqual({})
})

test("the refusal names each missing character by its address and quotes no prose", () => {
  const said = unlistedRefused("Nala finds Aldo threshing.", [NALA], CAST)
  expect(said).toContain(ALDO)
  expect(said).toContain("--character")
  expect(said).not.toContain("threshing")
  expect(unlistedRefused("Nala waits.", [NALA], CAST)).toBeNull()
})

test("a lore page listed as a character is refused by its address, as no character", () => {
  const said = listedRefused("Nala waits.", [NALA, "lore/saga-aldo-reeve"], CAST, ADMITTED)
  expect(said).toContain("`lore/saga-aldo-reeve` names a `lore`")
  expect(said).not.toContain("waits")
  expect(listedRefused("Nala waits.", [NALA, ALDO], CAST, ADMITTED)).toBeNull()
  expect(listedRefused("Nala finds Aldo threshing.", [NALA], CAST, ADMITTED)).toContain(ALDO)
})

test("a page of world-character itself is a character, and an address filing no page is refused", () => {
  const base = "world-character/saga-crow"
  expect(listedRefused("Nala waits.", [NALA, base], CAST, ADMITTED)).toBeNull()
  const absent = "character-other/saga-nobody"
  expect(listedRefused("Nala waits.", [NALA, absent], CAST, ADMITTED)).toContain(
    `\`${absent}\` names no page`
  )
})

test("a turn's list is kept adding only a filed page of a character type", () => {
  const cast = [...CAST, { address: "lore/saga-will", title: "Will", aliasOf: null }]
  const turn = { at: TURN_AT, value: { prose: "txt", characters: [NALA] } }
  expect(castKept(turn, cast, textOf("Nala finds Will."), ADMITTED)).toEqual({})
  const unfiled = { types: ADMITTED.types, filed: (one: string) => one !== ALDO }
  expect(castKept(turn, CAST, textOf("Nala finds Aldo."), unfiled)).toEqual({})
})
