import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rhaldonFlemmens = {
  id: "01a0b70c-9607-791e-9a2d-0ae952c38f28",
  type: "page-type/world-character",
  slug: "rhaldon-flemmens",
  title: "Rhaldon Flemmens",
  world: "world/the-wandering-inn",
  firstChapter: 707,
  lastChapter: 788,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
