import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const clownHero = {
  id: "01a0b70a-03cb-7369-a9ae-22db3ec07054",
  type: "page-type/world-character",
  slug: "clown-hero",
  title: "the Clown",
  world: "world/the-wandering-inn",
  firstChapter: 777,
  lastChapter: 777,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
