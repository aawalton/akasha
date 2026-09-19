import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ladyCalvaLanight = {
  id: "01a0b70b-7288-7d59-ba58-32bf69e70f6e",
  type: "page-type/world-character",
  slug: "lady-calva-lanight",
  title: "Calva",
  world: "world/the-wandering-inn",
  firstChapter: 717,
  lastChapter: 717,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
