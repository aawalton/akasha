import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const forcewallBubble = {
  id: "01a06572-95c5-77a3-a580-171c7b6881f5",
  type: "page-type/world-spell",
  slug: "forcewall-bubble",
  title: "Forcewall: Bubble",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:06:43.397Z",
  updatedAt: "2026-09-22T13:34:32.000Z",
} as const satisfies WorldSpell
