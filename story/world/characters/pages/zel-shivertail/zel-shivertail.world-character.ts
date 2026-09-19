import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const zelShivertail = {
  id: "01a0b70d-e9f2-73a1-9bb2-f5bb0ed49f83",
  type: "page-type/world-character",
  slug: "zel-shivertail",
  title: "Zel Shivertail",
  world: "world/the-wandering-inn",
  firstChapter: 101,
  lastChapter: 757,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
