import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const theTowerDrownedSentry01 = {
  id: "01a0c662-cc47-76ae-a006-3f9b584913f1",
  type: "page-type/game-entity",
  slug: "the-tower-drowned-sentry-01",
  title: "Drowned Sentry",
  game: "game/the-tower",
  note: "computed by engine: VIT8(88)+MIGHT2(24) = 112 HP. High HP + high frontal mitigation = a slog if read wrong; fast if read right.",
} as const satisfies GameEntity
