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
        "Every row holding a whole document is gone: `states`, `turns`, `entities`, `characters`, `tower-floors` and `tower-sessions`, and the command that read them. A `game-turn` page carries what a turn raised, spent, worked out and reached; a `game-quest` page carries a quest; the played story reads its state off those and the player's page through `turn-state`. Left: see the tower's played page draw from pages once `alan-web` is deployed, then take this intent off.\n",
    },
  ],
} as const satisfies Initiative
