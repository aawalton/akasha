import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenOneSeatFlow = {
  id: "01a18d37-c988-75f9-b991-29319a604613",
  type: "page-type/initiative",
  slug: "awen-one-seat-flow",
  domain: "domain/story-engine",
  persona: "persona/awen",
  parent: "initiative/awen-single-seat-turn",
  intentStack: [
    {
      statement: "A one-seat turn has no pictures step, and its picture recorder never runs.",
    },
    {
      statement:
        "A one-seat turn's memory is one item for the whole turn, after it reaches player.",
      workingMemory:
        "Memory lands where it lands now. A next action sent while it is open waits for it to land. It is timed apart from the turn's time to player.",
    },
    {
      statement: "A one-seat turn works the numbers of every beat, then the prose of every beat.",
      workingMemory:
        "A beat is still shown once its prose lands. A numbers refusal still restates that beat and those after it, before any prose is written.",
    },
  ],
  constraints: [
    "A seat-graph story makes its turns exactly as it does now.",
    "No turn is taken in gifted-reborn, which is Alan's real save.",
  ],
  createdAt: "2026-10-30T14:30:05.959Z",
  updatedAt: "2026-10-30T14:47:45.519Z",
} as const satisfies Initiative
