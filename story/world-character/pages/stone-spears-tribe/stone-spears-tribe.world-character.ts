import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const stoneSpearsTribe = {
  id: "01a0b70d-0ee7-7997-b03c-868e94525ff9",
  type: "page-type/world-character",
  slug: "stone-spears-tribe",
  title: "Stone Spears tribe",
  world: "world/the-wandering-inn",
  firstChapter: 111,
  lastChapter: 111,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
