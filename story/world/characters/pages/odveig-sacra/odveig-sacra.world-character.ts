import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const odveigSacra = {
  id: "01a0b70c-1503-7670-bc7a-361fece402eb",
  type: "page-type/world-character",
  slug: "odveig-sacra",
  title: "Odveig",
  world: "world/the-wandering-inn",
  firstChapter: 204,
  lastChapter: 204,
  characterClaims: "jsonl",
  aliasOf: "world-character/sacra",
} as const satisfies WorldCharacter
