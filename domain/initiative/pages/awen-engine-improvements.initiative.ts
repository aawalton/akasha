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
        "50 page types under `story/` sit in two disjoint trees. `page-type/game` is not among `world`'s parts, nor `world` among `game`'s, and the only join is a slug match in `game-beside.module.code.ts`. Duplicates: `story-wiki-entry` against `game-lore-entry`; `story-design` and `story-design-note` against `game-design-entry`, both carried by The Tower.",
    },
    { statement: "Every page under `story/` is of a page type in that set." },
    { statement: "All game state for The Tower uses the new page types." },
    {
      statement: "The Tower's attribute scores live only on the new attribute pages.",
      workingMemory:
        "Only `turn-state.module.code.ts:135` reads an entity's `attributes`, and `sheet-panel.module.code.tsx:98` already discards it for the 128 new pages. The eight game-mechanic files take a sheet on the command line and read no page, so they block nothing. Deleting `attributes` from the sixteen entity pages needs no code change. What is left is a first-paint flicker while the query resolves, and whether the game master reads the entity page by eye.",
    },
  ],
  constraints: [
    "Alan approves the shape of each page type under `story/` before that page type is built.",
  ],
} as const satisfies Initiative
