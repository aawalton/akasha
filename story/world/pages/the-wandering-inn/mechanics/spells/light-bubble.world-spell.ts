import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightBubble = {
  id: "01a06572-95ce-76d1-9546-3cf37663e552",
  type: "page-type/world-spell",
  slug: "light-bubble",
  title: "Light Bubble",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.406Z",
  updatedAt: "2026-09-22T13:34:41.000Z",
} as const satisfies WorldSpell
