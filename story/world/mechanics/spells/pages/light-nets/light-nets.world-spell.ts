import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightNets = {
  id: "01a06572-95ce-70df-bc1a-df2808a2a20f",
  type: "page-type/world-spell",
  slug: "light-nets",
  title: "Light Nets",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
