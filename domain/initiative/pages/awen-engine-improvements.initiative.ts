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
        "No game keeps a row now. The four ledgers are page types: `game-design-entry` (19), `game-lore-entry` (74), `game-mechanic-run` (121, the rolls among them), made by `akasha game unpack` and written from here on by `game settle`, which lands a run page and takes its hash off the file beside the run before. Left beside a game, and settled as files by `page-type/doctrine`: `gm-context`, `rulebook`, `resolution-mechanism`, `narrative-continuity`, `config`, `display-config`.\n",
    },
  ],
} as const satisfies Initiative
