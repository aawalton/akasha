import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const greaterTeleportation = {
  id: "01a06572-95c7-7b35-a4ae-10c277da2c53",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "greater-teleportation",
  title: "Greater Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
