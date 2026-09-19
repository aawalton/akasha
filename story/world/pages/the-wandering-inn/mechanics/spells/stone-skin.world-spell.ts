import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneSkin = {
  id: "01a06572-95e3-79c5-ba6a-1133357c953b",
  type: "page-type/world-spell",
  slug: "stone-skin",
  title: "Stone Skin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
