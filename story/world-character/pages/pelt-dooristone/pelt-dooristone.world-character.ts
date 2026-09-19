import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const peltDooristone = {
  id: "01a0b70c-288b-7c8a-929d-e5f8576c91f9",
  type: "page-type/world-character",
  slug: "pelt-dooristone",
  title: "Pelt Dooristone",
  world: "world/the-wandering-inn",
  firstChapter: 655,
  lastChapter: 655,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
