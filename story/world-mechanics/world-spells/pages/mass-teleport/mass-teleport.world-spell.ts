import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const massTeleport = {
  id: "01a06572-95d2-7acd-84ce-2ffa730aed7b",
  type: "world-spell",
  slug: "mass-teleport",
  title: "Mass Teleport",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
