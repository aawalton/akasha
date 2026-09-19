import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const damia = {
  id: "01a06580-2494-7252-b249-74a9db86202a",
  type: "page-type/world-character",
  slug: "damia",
  title: "Damia Reinhart",
  world: "world/the-wandering-inn",
  maxLevel: 12,
  eventCount: 9,
  firstChapter: 819,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/damia-reinhart",
} as const satisfies WorldCharacter
