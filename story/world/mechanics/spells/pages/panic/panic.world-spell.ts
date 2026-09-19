import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const panic = {
  id: "01a06572-95da-7587-9448-cc47f952573a",
  type: "page-type/world-spell",
  slug: "panic",
  title: "Panic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
