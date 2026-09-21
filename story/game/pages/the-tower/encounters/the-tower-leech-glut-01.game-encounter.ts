import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerLeechGlut01 = {
  id: "01a0c65d-1d92-77d2-9c6e-a1d9e99bc6f0",
  type: "page-type/game-encounter",
  slug: "the-tower-leech-glut-01",
  title: "The Glut",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-02",
  entities: ["game-entity/the-tower-leech-glut-01"],
  trigger: "entering the deep water, submerging, or warmth/blood entering the flood",
  experience: 90,
  drop: "a sac of swarm-ichor (alchemy/affinity seed) — sticky, mildly caustic, throwable",
} as const satisfies GameEncounter
