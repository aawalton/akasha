import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const captainShipbreaker = {
  id: "01a0b707-9437-712c-a082-84852c620ad2",
  type: "page-type/world-character",
  slug: "captain-shipbreaker",
  title: "Captain Shipbreaker",
  world: "world/the-wandering-inn",
  firstChapter: 553,
  lastChapter: 553,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
