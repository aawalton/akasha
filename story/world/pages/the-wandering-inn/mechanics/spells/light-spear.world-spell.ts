import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightSpear = {
  id: "01a06572-95ce-78dd-92d4-95b87fda1f42",
  type: "page-type/world-spell",
  slug: "light-spear",
  title: "Light Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
