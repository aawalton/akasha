import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatHandInTime = {
  id: "01a18dff-1a43-744b-b375-1e682150c49d",
  type: "page-type/initiative",
  slug: "awen-one-seat-hand-in-time",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-one-seat-polish",
  constraints: [
    "No turn is taken, no message sent and nothing advanced in gifted-reborn, which is Alan's real save.",
    "A clone played by agents only tests the change, and is removed once its last test is done.",
    "No work is taken out of a hand-in before the time that work costs is measured.",
  ],
  createdAt: "2026-10-30T18:07:48.290Z",
  updatedAt: "2026-10-30T19:33:49.606Z",
  intentStack: [],
} as const satisfies Initiative
