import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const bloodfury = {
  id: "01a06572-95b6-7d06-8d4e-c42327ef2c86",
  type: "page-type/world-spell",
  slug: "bloodfury",
  title: "Bloodfury",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
