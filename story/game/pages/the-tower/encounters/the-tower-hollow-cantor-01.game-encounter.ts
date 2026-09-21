import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerHollowCantor01 = {
  id: "01a0c65d-1e2b-77da-8f77-a0b260f20b12",
  type: "page-type/game-encounter",
  slug: "the-tower-hollow-cantor-01",
  title: "Hollow Cantor",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-03",
  entities: ["game-entity/the-tower-hollow-cantor-01"],
  trigger: "advancing into the nave past the first pair of plates",
  experience: 160,
  drop: "a tuning-shard of folded sound (sound/affinity seed) and +1 toward a 'Resonance Reading' skill — the System notes he learned to read a space by its echoes",
} as const satisfies GameEncounter
