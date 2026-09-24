import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const partnersIiNatalie = {
  id: "01a0c663-20aa-76ce-b9be-ebc4568900c7",
  type: "page-type/game-entity",
  slug: "partners-ii-natalie",
  title: "Natalie",
  game: "story-game/partners-ii",
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
