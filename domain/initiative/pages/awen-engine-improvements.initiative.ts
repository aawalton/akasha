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
        "The tower plays off pages: its bars, its sheet and its log come off `game-turn` and the player's page through `turn-state`, verified rendering on the live site. Gone: `states`, `turns`, `entities`, `characters`, `tower-floors`, `tower-sessions`, and the command that read them. Left, each still a document in a file beside a game: `gm-context`, `rulebook`, `resolution-mechanism`, `narrative-continuity`, `config`, and the ledgers `rolls`, `mechanic-runs`, `lore-entries`, `design-entries`.\n",
    },
  ],
} as const satisfies Initiative
