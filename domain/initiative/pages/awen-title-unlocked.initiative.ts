import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenTitleUnlocked = {
  id: "01a183e9-ac02-7581-85d0-13e1ef6769d5",
  type: "page-type/initiative",
  slug: "awen-title-unlocked",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    { statement: "It should be Achievement Unlocked instead of Achievement Acquired." },
  ],
  constraints: [
    "Only Alan takes turns in gifted-reborn.",
    "Screenshots use https://alanwalton.com.",
  ],
  createdAt: "2026-10-28T19:08:11.649Z",
  updatedAt: "2026-10-28T19:08:11.649Z",
} as const satisfies Initiative
