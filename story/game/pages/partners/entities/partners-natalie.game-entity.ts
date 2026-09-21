import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersNatalie = {
  id: "01a0c663-0cb5-7259-8c11-40de259f150b",
  type: "page-type/game-entity",
  slug: "partners-natalie",
  title: "Natalie",
  game: "game/partners",
  kind: "partner",
  level: 3,
  skills: [
    { name: "Cooking", progress: 0, effect: "none stated" },
    { name: "Provisioning", progress: 0, effect: "none stated" },
    { name: "Hearthlore", progress: 0, effect: "none stated" },
    { name: "Comfort", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Traveling cook of quietly legendary rank; followed the kitchen's song for a week.",
} as const satisfies GameEntity
