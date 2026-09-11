import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const teleportationRay = {
  id: "01a06572-95e6-72d2-8d02-fb2bae28781a",
  type: "world-spell",
  slug: "teleportation-ray",
  title: "Teleportation Ray",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
