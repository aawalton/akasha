import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersIiEmber = {
  id: "01a0c663-2058-752f-9c58-61ffd0520f08",
  type: "page-type/game-entity",
  slug: "partners-ii-ember",
  title: "Ember",
  game: "game/partners-ii",
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
