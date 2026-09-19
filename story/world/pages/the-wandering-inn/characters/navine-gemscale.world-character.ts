import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const navineGemscale = {
  id: "01a0b70c-02ee-7e0c-b474-cb0536430159",
  type: "page-type/world-character",
  slug: "navine-gemscale",
  title: "Navine Gemscale",
  world: "world/the-wandering-inn",
  firstChapter: 501,
  lastChapter: 501,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
