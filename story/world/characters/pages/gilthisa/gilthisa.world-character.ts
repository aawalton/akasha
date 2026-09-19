import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gilthisa = {
  id: "01a0b70a-9dfb-7433-9e97-205c0606bdbb",
  type: "page-type/world-character",
  slug: "gilthisa",
  title: "Gilthisa",
  world: "world/the-wandering-inn",
  firstChapter: 795,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
