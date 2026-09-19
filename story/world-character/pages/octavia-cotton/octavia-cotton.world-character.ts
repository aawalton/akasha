import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const octaviaCotton = {
  id: "01a0b70c-1454-7138-adbd-80139431b4f7",
  type: "page-type/world-character",
  slug: "octavia-cotton",
  title: "Octavia Cotton",
  world: "world/the-wandering-inn",
  firstChapter: 328,
  lastChapter: 628,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
