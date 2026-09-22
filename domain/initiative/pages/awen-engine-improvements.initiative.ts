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
        "Every game's world is pages: 45 entity, 24 location, 11 encounter, by `akasha game import --game <game>`. The tower's encounters carry their gates; the gm-context and resolution-mechanism point at the pages; each game names the one its player runs; an entity carries the pools play spends. Left: the state. `states.jsonl` still holds the turn, the pools, the revealed sheet, the log, the chapters and the quests, and `played-shell` reads its last row.\n",
    },
  ],
} as const satisfies Initiative
