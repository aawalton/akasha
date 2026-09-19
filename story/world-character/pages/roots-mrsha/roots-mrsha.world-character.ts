import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rootsMrsha = {
  id: "01a0b70c-9cf5-70a4-85fe-3f23ac401706",
  type: "page-type/world-character",
  slug: "roots-mrsha",
  title: "Roots Mrsha",
  world: "world/the-wandering-inn",
  firstChapter: 753,
  lastChapter: 757,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
