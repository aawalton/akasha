import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const greasePuddle = {
  id: "01a06572-95c6-73e2-9460-46a6bebf5ae5",
  type: "page-type/world-spell",
  slug: "grease-puddle",
  title: "Grease Puddle",
  world: "world/the-wandering-inn",
} as const satisfies WorldSpell
