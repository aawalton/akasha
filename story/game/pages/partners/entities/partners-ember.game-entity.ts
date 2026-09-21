import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersEmber = {
  id: "01a0c663-0c8b-75c2-8eef-d1ad38d493fe",
  type: "page-type/game-entity",
  slug: "partners-ember",
  title: "Ember",
  game: "game/partners",
  kind: "partner",
  level: 4,
  skills: [
    { name: "Smithing", progress: 0, effect: "none stated" },
    { name: "Hammerfight", progress: 0, effect: "none stated" },
    { name: "Ashvein Lore", progress: 0, effect: "none stated" },
    { name: "Haggling", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Cat-eared smith of Amberford. Fights like a forge: patient, then all at once.",
} as const satisfies GameEntity
