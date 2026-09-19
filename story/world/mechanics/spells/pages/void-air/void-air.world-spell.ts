import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const voidAir = {
  id: "01a06572-95e8-7c45-926e-4fc77645ef5a",
  type: "page-type/world-spell",
  slug: "void-air",
  title: "Void Air",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
