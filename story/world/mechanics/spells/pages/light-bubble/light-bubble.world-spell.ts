import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBubble = {
  id: "01a06572-95ce-76d1-9546-3cf37663e552",
  type: "page-type/world-spell",
  slug: "light-bubble",
  title: "Light Bubble",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
