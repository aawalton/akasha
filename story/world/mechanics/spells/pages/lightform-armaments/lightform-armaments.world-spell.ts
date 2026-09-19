import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightformArmaments = {
  id: "01a06572-95cf-7ec6-8157-30f71971872a",
  type: "page-type/world-spell",
  slug: "lightform-armaments",
  title: "Lightform Armaments",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
