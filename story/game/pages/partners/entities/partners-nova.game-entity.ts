import type { GameEntity } from "akasha/story/game/game-entity/game-entity.page-type.types.ts"

export const partnersNova = {
  id: "01a0c663-0c41-7c1d-9feb-fffe94406515",
  type: "page-type/game-entity",
  slug: "partners-nova",
  title: "Nova",
  game: "story-game/partners",
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
