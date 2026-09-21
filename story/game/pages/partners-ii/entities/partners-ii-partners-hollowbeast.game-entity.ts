import type { GameEntity } from "akasha/story/game/entity/game-entity.page-type.types.ts"

export const partnersIiPartnersHollowbeast = {
  id: "01a0c663-206d-722c-bbe8-8bb0ba861557",
  type: "page-type/game-entity",
  slug: "partners-ii-partners-hollowbeast",
  title: "Hollowbeast",
  game: "game/partners-ii",
  kind: "creature",
  level: 1,
  skills: [
    { name: "Stalk", progress: 0, effect: "none stated" },
    { name: "Pounce", progress: 0, effect: "none stated" },
  ],
  revealGate: 9999,
  note: "The Sundering's scar given a body: a living thing severed from the web of bonds. Individually manageable at low level; packs escalate (later arc). Reusable base statblock — scale count/level for later packs; the Choir-driven sever-lure variant is a later design. Encounter design: gmReference section 'firstDanger'.",
} as const satisfies GameEntity
