import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const giantThreeEyed = {
  id: "01a0b70a-9d1a-73c9-bb36-d9be3c430a1f",
  type: "page-type/world-character",
  slug: "giant-three-eyed",
  title: "the three-eyed giant",
  world: "world/the-wandering-inn",
  firstChapter: 477,
  lastChapter: 477,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
