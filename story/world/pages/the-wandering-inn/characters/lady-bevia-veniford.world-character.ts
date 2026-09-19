import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ladyBeviaVeniford = {
  id: "01a0b70b-7219-7642-aeeb-2533ca98ed9d",
  type: "page-type/world-character",
  slug: "lady-bevia-veniford",
  title: "Lady Bevia Veniford",
  world: "world/the-wandering-inn",
  firstChapter: 252,
  lastChapter: 252,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
