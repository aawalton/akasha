import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const auraMute = {
  id: "01a06572-95b5-73bf-aacb-f970259247cb",
  type: "world-spell",
  slug: "aura-mute",
  title: "Aura Mute",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
