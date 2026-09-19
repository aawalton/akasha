import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mrshaFuture = {
  id: "01a0b70b-fb1b-70e3-b0c0-8f3ea997a4db",
  type: "page-type/world-character",
  slug: "mrsha-future",
  title: "Mrsha Marquin Solstice",
  world: "world/the-wandering-inn",
  firstChapter: 740,
  lastChapter: 746,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
