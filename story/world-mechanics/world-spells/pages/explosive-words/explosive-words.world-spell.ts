import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const explosiveWords = {
  id: "01a06572-95bf-7cee-af06-ea9052fbca82",
  type: "world-spell",
  slug: "explosive-words",
  title: "Explosive Words",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
