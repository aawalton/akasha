import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const efficientTeleportation = {
  id: "01a06572-95bf-7f10-95e9-a50948c93e59",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "efficient-teleportation",
  title: "Efficient Teleportation",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
