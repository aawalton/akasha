import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const guildMasterPessia = {
  id: "01a0b70a-eda4-7dc2-aeca-ab49308b09dc",
  type: "page-type/world-character",
  slug: "guild-master-pessia",
  title: "Guild Master Pessia",
  world: "world/the-wandering-inn",
  firstChapter: 112,
  lastChapter: 112,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
