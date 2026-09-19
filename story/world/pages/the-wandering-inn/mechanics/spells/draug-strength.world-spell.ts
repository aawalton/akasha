import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const draugStrength = {
  id: "01a06572-95be-731c-ab30-09d480c5547f",
  type: "page-type/world-spell",
  slug: "draug-strength",
  title: "Draug Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
