import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatStatusLine = {
  id: "01a18dff-1a44-7a78-ba1a-9406b88a47fd",
  type: "page-type/initiative",
  slug: "awen-one-seat-status-line",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-one-seat-polish",
  constraints: [
    "No turn is taken, no message sent and nothing advanced in gifted-reborn, which is Alan's real save.",
    "A clone played by agents only tests the change, and is removed once its last test is done.",
    "A page is seen on alanwalton.com, never on atlas.alanwalton.com.",
  ],
  createdAt: "2026-10-30T18:07:48.290Z",
  updatedAt: "2026-10-30T18:54:21.495Z",
  intentStack: [],
} as const satisfies Initiative
