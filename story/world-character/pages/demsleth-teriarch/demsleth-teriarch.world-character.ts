import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const demslethTeriarch = {
  id: "01a0b70a-1766-7375-8c27-0f8636833647",
  type: "page-type/world-character",
  slug: "demsleth-teriarch",
  title: "Demsleth",
  world: "world/the-wandering-inn",
  firstChapter: 707,
  lastChapter: 707,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
