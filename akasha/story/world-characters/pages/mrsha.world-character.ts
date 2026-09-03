import type { WorldCharacter } from "../world-character.page-type.ts"

export const mrsha = {
  id: "01a06580-2495-70df-86a4-4492ec2e0a03",
  pageTypeSlug: "world-character",
  slug: "mrsha",
  title: "Mrsha",
  worldSlug: "the-wandering-inn",
  maxLevel: 70,
  eventCount: 49,
  firstChapter: 246,
  lastChapter: 763,
} as const satisfies WorldCharacter
