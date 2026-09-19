import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createPebble = {
  id: "01a06572-95bb-78a7-ba7e-b9e3e4e01627",
  type: "page-type/world-spell",
  slug: "create-pebble",
  title: "Create: Pebble",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
