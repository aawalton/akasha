import type { GameEncounter } from "akasha/story/game/encounter/game-encounter.page-type.types.ts"

export const theTowerGloomwardStalker01 = {
  id: "01a0c661-22f9-7267-bfb2-b938e8e09db0",
  type: "page-type/game-encounter",
  slug: "the-tower-gloomward-stalker-01",
  title: "Gloomward Stalker",
  game: "game/the-tower",
  location: "game-location/the-tower-floor-04",
  entities: ["game-entity/the-tower-gloomward-stalker-01"],
  trigger:
    "moving up past the first broken flight in the dark, OR any sound/warmth carried up the shaft while unlit",
  experience: 180,
  drop: "a Stalker's eye-lens (a dark-affinity / night-sight seed — clouded crystal that drinks light; crafting/affinity seed) and its hide (light, tough — a wearable cloak, armor def 1, OR a crafting material)",
} as const satisfies GameEncounter
