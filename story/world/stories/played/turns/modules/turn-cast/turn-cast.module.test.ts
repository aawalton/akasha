import { expect, test } from "bun:test"
import {
  type Character,
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

test("the refusal names each missing character by its address and quotes no prose", () => {
  const said = unlistedRefused("Nala finds Aldo threshing.", [NALA], CAST)
  expect(said).toContain(ALDO)
  expect(said).toContain("--character")
  expect(said).not.toContain("threshing")
  expect(unlistedRefused("Nala waits.", [NALA], CAST)).toBeNull()
})
