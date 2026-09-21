import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersIiGrace = {
  id: "01a0c663-2098-728f-b789-f79f72057afa",
  type: "page-type/game-entity",
  slug: "partners-ii-grace",
  title: "Grace",
  game: "game/partners-ii",
  kind: "partner",
  level: 5,
  skills: [
    { name: "Threshold Ways", progress: 0, effect: "none stated" },
    { name: "Mistwalking", progress: 0, effect: "none stated" },
    { name: "Veil Lore", progress: 0, effect: "none stated" },
    { name: "Soothing", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Keeper of the Veilmere. The strongest of the first wave; met at the threshold of someone's death.",
} as const satisfies GameEntity
