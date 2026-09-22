import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenEngineImprovements = {
  id: "01a0b70a-2288-7eca-8e8e-16058b9e89d1",
  type: "page-type/initiative",
  slug: "awen-engine-improvements",
  domain: "domain/story-engine",
  persona: "persona/awen",
  intentStack: [
    {
      statement: "A game is made of pages rather than rows holding whole documents.",
      workingMemory:
        "The state is pages. A `game-turn` page carries the system windows a turn raised, the pools as the turn left them with the most each held, the numbers the mechanics worked out, and the rung each skill had reached; turn 88 carries all of it. Alan's page carries his sheet. Left: `played-shell` still reads the last row of `states.jsonl`; it is to read the last turn page and the player's page instead, and then the rows go.\n",
    },
  ],
} as const satisfies Initiative
