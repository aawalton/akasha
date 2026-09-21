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
        "`game-entity`, `game-location` and `game-encounter` are built, under `story/game/{entity,location,encounter}`. What they share (holding-game, listed-name, listed-note) sits at `story/game/properties`. Next: a command reading entities, characters and tower-floors at runtime and writing entity, location and encounter pages under each game's folder. Then states, turns and tower-sessions go, the log becomes a system-window record on the turn page, and a session number lands there.\n",
    },
  ],
} as const satisfies Initiative
