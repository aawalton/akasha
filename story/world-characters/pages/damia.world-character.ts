import type { WorldCharacter } from "../world-character.page-type.ts"

export const damia = {
  id: "01a06580-2494-7252-b249-74a9db86202a",
  pageTypeSlug: "world-character",
  slug: "damia",
  title: "Damia Reinhart",
  worldSlug: "the-wandering-inn",
  maxLevel: 12,
  eventCount: 9,
  firstChapter: 820,
  lastChapter: 821,
} as const satisfies WorldCharacter
