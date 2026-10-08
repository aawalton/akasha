import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const clownHero = {
  id: "01a0b70a-03cb-7369-a9ae-22db3ec07054",
  type: "page-type/world-character",
  slug: "clown-hero",
  title: "the Clown",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 777,
  lastChapter: 777,
  characterClaims: "jsonl",
  createdAt: "2026-09-19T00:21:21.995Z",
  updatedAt: "2026-09-22T13:09:18.000Z",
} as const satisfies WorldCharacter
