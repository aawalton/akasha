import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const guildMasterJekra = {
  id: "01a0b70a-ed66-7cf6-8cee-9e93495acac5",
  type: "page-type/world-character",
  slug: "guild-master-jekra",
  title: "Guild Master Jekra",
  world: "world/the-wandering-inn",
  firstChapter: 112,
  lastChapter: 112,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
