import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const feorArchmage = {
  id: "01a0b70a-8098-7eff-8350-d6ac99f1c9d7",
  type: "page-type/world-character",
  slug: "feor-archmage",
  title: "Archmage Feor",
  world: "world/the-wandering-inn",
  firstChapter: 431,
  lastChapter: 431,
  characterClaims: "jsonl",
  aliasOf: "world-character/feor",
} as const satisfies WorldCharacter
