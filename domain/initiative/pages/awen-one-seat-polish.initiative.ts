import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatPolish = {
  id: "01a18dfc-c487-7f53-8f52-e79efe4cab0a",
  type: "page-type/initiative",
  slug: "awen-one-seat-polish",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-story-engine-v3",
  intentStack: [
    {
      statement: "A one-seat turn's status line names the checklist step its seat is on.",
      workingMemory:
        "Alan's next Gifted turn is the first one-seat turn he sees, and the action bar says 'The writer and recorders are working…' for it.",
    },
    {
      statement: "A one-seat hand-in costs the engine no more time than its work needs.",
      workingMemory:
        "The trial seat estimated 25-30s of engine time per hand-in, about 10 minutes over 20 beat items. Measure it before changing anything.",
    },
    {
      statement: "A notice to a one-seat story's seat names the world-builder lore it may read.",
    },
    {
      statement: "Address From The Page matches how checks read pages now.",
    },
    {
      statement: "A removed clone leaves no seat pages or folders of its seats behind.",
    },
  ],
  constraints: [
    "This initiative only coordinates, and subagents under its sub-initiatives do every implementation.",
    "Alan has approved every directive this initiative needs to land.",
    "No turn is taken in gifted-reborn, which is Alan's real save; a clone played by agents tests it.",
  ],
  createdAt: "2026-10-30T18:05:15.271Z",
  updatedAt: "2026-10-30T18:05:15.271Z",
} as const satisfies Initiative
