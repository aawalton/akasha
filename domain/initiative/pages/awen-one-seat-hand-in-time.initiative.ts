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
  updatedAt: "2026-10-30T18:07:56.787Z",
  intentStack: [
    {
      statement: "A one-seat hand-in costs the engine no more time than its work needs.",
      workingMemory:
        "The trial seat estimated 25-30s of engine time per hand-in, about 10 minutes over 20 beat items. Measure it before changing anything.",
    },
  ],
} as const satisfies Initiative
