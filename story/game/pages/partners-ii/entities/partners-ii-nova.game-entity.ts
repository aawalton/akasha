import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersIiNova = {
  id: "01a0c663-2031-7b44-944b-c7fac5fc9e83",
  type: "page-type/game-entity",
  slug: "partners-ii-nova",
  title: "Nova",
  game: "game/partners-ii",
  kind: "partner",
  level: 3,
  skills: [
    { name: "Locks & Larceny", progress: 0, effect: "none stated" },
    { name: "Concord Lore", progress: 0, effect: "none stated" },
    { name: "Sneak", progress: 0, effect: "none stated" },
    { name: "Tall Tales", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "Goblin burglar-scholar. Enters play mid-crime at the Understair; negotiates residency, citing precedent.",
} as const satisfies GameEntity
