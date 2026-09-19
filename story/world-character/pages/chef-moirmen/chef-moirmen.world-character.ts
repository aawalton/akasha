import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chefMoirmen = {
  id: "01a0b709-fd8e-7c96-9800-05a021d58a23",
  type: "page-type/world-character",
  slug: "chef-moirmen",
  title: "Moirmen",
  world: "world/the-wandering-inn",
  firstChapter: 646,
  lastChapter: 646,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
