import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const lesserTeleportation = {
  id: "01a06572-95cd-7ac3-9434-9900685ff962",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lesser-teleportation",
  title: "Lesser Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
