import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const secondSkin = {
  id: "01a06572-95df-7922-918e-f5dd2fe224e1",
  type: "page-type/world-spell",
  slug: "second-skin",
  title: "Second Skin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
