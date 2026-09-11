import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashFire = {
  id: "01a06572-95c3-7b24-98a2-e6621afc120d",
  type: "world-spell",
  slug: "flash-fire",
  title: "Flash Fire",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
