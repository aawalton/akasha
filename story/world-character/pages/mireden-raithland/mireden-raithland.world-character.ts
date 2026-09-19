import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const miredenRaithland = {
  id: "01a0b70b-eeff-756b-b70c-7905ec184669",
  type: "page-type/world-character",
  slug: "mireden-raithland",
  title: "Lord Mireden Raithland",
  world: "world/the-wandering-inn",
  firstChapter: 785,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
