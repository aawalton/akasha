import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const magicBubble = {
  id: "01a06572-95d0-7866-86ad-4c0f74fd3c6f",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "magic-bubble",
  title: "Magic Bubble",
  world: "the-wandering-inn",
} as const satisfies WorldSpell
