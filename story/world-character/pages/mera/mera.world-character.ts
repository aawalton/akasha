import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mera = {
  id: "01a0b70b-e74a-7744-bc37-fcc38ded0878",
  type: "page-type/world-character",
  slug: "mera",
  title: "Mera",
  world: "world/the-wandering-inn",
  firstChapter: 736,
  lastChapter: 736,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
