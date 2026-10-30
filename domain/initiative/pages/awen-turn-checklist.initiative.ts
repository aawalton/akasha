import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenTurnChecklist = {
  id: "01a18cb3-e515-7ef3-a5db-c9859f53fffd",
  type: "page-type/initiative",
  slug: "awen-turn-checklist",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  intentStack: [
    {
      statement:
        "The one seat follows a checklist of every step the seats cover now, lore through review.",
      workingMemory:
        "Each item is drawn from the instructions that step's seat gets now: its role page, its recorder or reviewer instructions file, and the prompt the step's seat is sent. No second copy of them.",
    },
    {
      statement:
        "Each review is a checklist item the seat checks and mends its own work by before player.",
    },
  ],
  constraints: [
    "No turn is taken in gifted-reborn, which is Alan's real save.",
    "Every word a game master is served changes without a deploy.",
  ],
  createdAt: "2026-10-30T12:06:02.259Z",
  updatedAt: "2026-10-30T12:06:02.259Z",
} as const satisfies Initiative
