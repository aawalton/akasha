import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const reclisDuMarquin = {
  id: "01a0b70c-88f7-785b-82ed-567170f7d926",
  type: "page-type/world-character",
  slug: "reclis-du-marquin",
  title: "King Reclis du Marquin",
  world: "world/the-wandering-inn",
  firstChapter: 774,
  lastChapter: 774,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
