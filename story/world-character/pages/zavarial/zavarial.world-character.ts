import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zavarial = {
  id: "01a0b70d-e907-7a4d-bec8-c9ac48262d86",
  type: "page-type/world-character",
  slug: "zavarial",
  title: "Bastion-General Zavarial",
  world: "world/the-wandering-inn",
  firstChapter: 438,
  lastChapter: 438,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
