import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sirNilMoxae = {
  id: "01a0b70d-027d-7491-9a22-d281fd9ec619",
  type: "page-type/world-character",
  slug: "sir-nil-moxae",
  title: "Sir Nil Moxae",
  world: "world/the-wandering-inn",
  firstChapter: 263,
  lastChapter: 263,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
