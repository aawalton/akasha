import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tekshia = {
  id: "01a0b70d-141d-7d90-8bc2-96037495ae84",
  type: "page-type/world-character",
  slug: "tekshia",
  title: "Tekshia Silverfang",
  world: "world/the-wandering-inn",
  appearanceCount: 4,
  firstChapter: 65,
  lastChapter: 386,
  characterClaims: "jsonl",
  aliasOf: "world-character/tekshia-shivertail",
  createdAt: "2026-09-19T00:24:42.781Z",
  updatedAt: "2026-09-22T13:09:54.000Z",
} as const satisfies WorldCharacter
