import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const xitegen = {
  id: "01a06580-2495-749b-b9da-a91436213dbc",
  type: "page-type/world-character",
  slug: "xitegen",
  title: "Xitegen",
  world: "world/the-wandering-inn",
  eventCount: 1,
  firstChapter: 656,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/xitegen-terland",
} as const satisfies WorldCharacter
