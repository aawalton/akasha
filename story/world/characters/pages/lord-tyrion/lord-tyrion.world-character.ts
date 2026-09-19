import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lordTyrion = {
  id: "01a0b70b-8ba1-735e-bdbd-47ce3d516b9d",
  type: "page-type/world-character",
  slug: "lord-tyrion",
  title: "Lord Tyrion",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 250,
  characterClaims: "jsonl",
  aliasOf: "world-character/tyrion-veltras",
} as const satisfies WorldCharacter
