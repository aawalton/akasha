import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const diplomatNerul = {
  id: "01a0b70a-19d8-70c3-b300-b41849c1532b",
  type: "page-type/world-character",
  slug: "diplomat-nerul",
  title: "Diplomat Nerul",
  world: "world/the-wandering-inn",
  firstChapter: 714,
  lastChapter: 714,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
