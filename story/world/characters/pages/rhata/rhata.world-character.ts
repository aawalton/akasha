import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rhata = {
  id: "01a0b70c-9642-7165-8086-d1dd9aca5f4d",
  type: "page-type/world-character",
  slug: "rhata",
  title: "Rhata",
  world: "world/the-wandering-inn",
  firstChapter: 823,
  lastChapter: 823,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
