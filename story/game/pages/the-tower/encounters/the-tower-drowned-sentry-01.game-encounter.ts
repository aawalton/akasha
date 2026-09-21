import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerDrownedSentry01 = {
  id: "01a0c662-cc02-750e-b987-3cd74e0665aa",
  type: "page-type/game-encounter",
  slug: "the-tower-drowned-sentry-01",
  title: "Drowned Sentry",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-02",
  entities: ["game-entity/the-tower-drowned-sentry-01"],
  trigger: "stepping onto the submerged platform, or attacking from the walkway",
  experience: 110,
  drop: "a still-warm rivet of fire-purged iron (heat-affinity seed) and the Sentry's intact pauldron (armor def 2, wearable — Alan's first armor)",
} as const satisfies GameEncounter
