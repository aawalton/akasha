import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const purgeRoom = {
  id: "01a06572-95db-7907-b545-025604471003",
  type: "world-spell",
  slug: "purge-room",
  title: "Purge Room",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
