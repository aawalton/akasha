import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const twinBoy = {
  id: "01a0b70d-7681-78c8-baa2-c5e81df73d65",
  type: "page-type/world-character",
  slug: "twin-boy",
  title: "a boy of sixteen",
  world: "world/the-wandering-inn",
  firstChapter: 27,
  lastChapter: 27,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
