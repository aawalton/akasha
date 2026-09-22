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
        "The state is nearly pages. Every turn the tower's log names is a `game-turn` page carrying the system windows it raised, and turn 88 carries what it cost; Alan's page carries his level, his unspent points, and the pools play has left him. Left: the HUD's maxima. `hp-max`, `focus-max` and `stam-max` work out 124, 120 and 76 exactly from his attributes, but only the command line runs a mechanic, so `played-shell` still reads the last row of `states.jsonl`.\n",
    },
  ],
} as const satisfies Initiative
