import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const yisame = {
  id: "01a0b70d-dd99-770c-b7ab-df74c225a21e",
  type: "page-type/world-character",
  slug: "yisame",
  title: "Yisame",
  world: "world/the-wandering-inn",
  firstChapter: 326,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
