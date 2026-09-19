import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const almightyRegeneration = {
  id: "01a06572-95b3-7c76-b42e-c16810ccdd6d",
  type: "page-type/world-spell",
  slug: "almighty-regeneration",
  title: "Almighty Regeneration",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
