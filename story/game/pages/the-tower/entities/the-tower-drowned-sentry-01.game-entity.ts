import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerDrownedSentry01 = {
  id: "01a0c662-cc47-76ae-a006-3f9b584913f1",
  type: "page-type/game-entity",
  slug: "the-tower-drowned-sentry-01",
  title: "Drowned Sentry",
  game: "game/the-tower",
  kind: "enemy",
  class: "Waterlogged Husk",
  level: 2,
  equipment: [
    { name: "armor", slot: "armor", defense: 3 },
    { name: "weapon", slot: "weapon", attack: 5 },
  ],
  dice: "game-mechanic/two-d-ten",
  baseDamage: 14,
  typicalIntent: 2,
  note: "computed by engine: VIT8(88)+MIGHT2(24) = 112 HP. High HP + high frontal mitigation = a slog if read wrong; fast if read right.",
} as const satisfies GameEntity
