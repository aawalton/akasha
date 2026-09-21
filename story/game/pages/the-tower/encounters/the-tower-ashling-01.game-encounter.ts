import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerAshling01 = {
  id: "01a0c661-239b-7385-9bab-84fbe44ddb30",
  type: "page-type/game-encounter",
  slug: "the-tower-ashling-01",
  title: "Ashling",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-01",
  entities: ["game-entity/the-tower-ashling-01"],
  trigger: "first movement past the iron door",
  experience: 60,
  drop: "a warm fist-sized cinder (the cooled core) — first crafting/affinity seed",
} as const satisfies GameEncounter
