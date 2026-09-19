import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const windblast = {
  id: "01a06572-95ea-7c4a-a15f-33c1ccc2c7f0",
  type: "page-type/world-spell",
  slug: "windblast",
  title: "Windblast",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
