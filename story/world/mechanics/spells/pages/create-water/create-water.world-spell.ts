import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const createWater = {
  id: "01a06572-95bb-7682-9da8-c0133790e35f",
  type: "page-type/world-spell",
  slug: "create-water",
  title: "Create Water",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
