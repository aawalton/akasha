import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const awenEngineImprovements = {
  id: "01a0b70a-2288-7eca-8e8e-16058b9e89d1",
  type: "page-type/initiative",
  slug: "awen-engine-improvements",
  domain: "page-type/story",
  persona: "persona/awen",
  intentStack: [
    {
      statement: "The story page types are one designed set under `story/`.",
      workingMemory:
        "The page types under `story/` sit in two disjoint trees. `page-type/game` is not among `world`'s parts, nor `world` among `game`'s, and the only join is a slug match in `game-beside.module.code.ts`. Duplicates: `story-wiki-entry` against `game-lore-entry`; `story-design` and `story-design-note` against `game-design-entry`, both carried by The Tower.",
    },
    { statement: "Every page under `story/` is of a page type in that set." },
    { statement: "All game state for The Tower uses the new page types." },
  ],
  constraints: [
    "Alan approves the shape of each page type under `story/` before that page type is built.",
  ],
} as const satisfies Initiative
