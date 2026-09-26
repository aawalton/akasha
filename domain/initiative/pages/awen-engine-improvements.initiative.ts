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
        "Lore: a fact sits on one lore page, in one of four phases: world builder, game master, player, wiki. Lore states the world, never instructs the game master. The Tower's Death Loop is the world builder's until Alan first dies. Mechanics: one family, world-mechanic under `story/world/mechanics/`, and `story/mechanic/` merges into it. A generic kind is the thing as a world defines it; a story-specific kind extending it holds a character's state.\n",
    },
    { statement: "Every page under `story/` is of a page type in that set." },
    { statement: "All game state for The Tower uses the new page types." },
  ],
  constraints: [
    "Alan approves the shape of each page type under `story/` before that page type is built.",
    "A property only one world or one story has needs no approval from Alan.",
  ],
} as const satisfies Initiative
