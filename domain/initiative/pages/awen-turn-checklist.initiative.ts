import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenTurnChecklist = {
  id: "01a18cb3-e515-7ef3-a5db-c9859f53fffd",
  type: "page-type/initiative",
  slug: "awen-turn-checklist",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  constraints: [
    "No turn is taken in gifted-reborn, which is Alan's real save.",
    "Every word a game master is served changes without a deploy.",
  ],
  createdAt: "2026-10-30T12:06:02.259Z",
  updatedAt: "2026-10-30T13:22:16.148Z",
} as const satisfies Initiative
