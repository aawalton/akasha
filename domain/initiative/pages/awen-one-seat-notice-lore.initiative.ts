import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatNoticeLore = {
  id: "01a18dff-1a44-783c-a586-f865aed00208",
  type: "page-type/initiative",
  slug: "awen-one-seat-notice-lore",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-one-seat-polish",
  constraints: [
    "No turn is taken, no message sent and nothing advanced in gifted-reborn, which is Alan's real save.",
    "A clone played by agents only tests the change, and is removed once its last test is done.",
  ],
  createdAt: "2026-10-30T18:07:48.290Z",
  updatedAt: "2026-10-30T18:07:48.290Z",
} as const satisfies Initiative
