import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatRouting = {
  id: "01a18cb3-e515-7115-af3b-b5a10dd5ad59",
  type: "page-type/initiative",
  slug: "awen-one-seat-routing",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  intentStack: [
    {
      statement: "Which way a played story makes its turns is one value on the story's page.",
      workingMemory:
        "A select property on story-played, values `seat-graph` (as now, and what a story stating nothing does) and `one-seat`.",
    },
    {
      statement:
        "A one-seat story's game master seat hands in every step, and no other seat is told.",
    },
    {
      statement: "A one-seat story's game master seat reads the lore the world builder holds.",
    },
  ],
  constraints: [
    "No turn is taken in gifted-reborn, which is Alan's real save.",
    "A story stating nothing for the value makes its turns exactly as it does now.",
    "A one-seat turn lands its beats, outcomes, memory, pictures and prose where a seat-graph turn lands them.",
  ],
  createdAt: "2026-10-30T12:06:02.259Z",
  updatedAt: "2026-10-30T12:06:02.259Z",
} as const satisfies Initiative
