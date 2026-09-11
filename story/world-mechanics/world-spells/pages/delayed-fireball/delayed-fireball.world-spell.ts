import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const delayedFireball = {
  id: "01a06572-95bc-7c29-b7f6-55afa935e7d3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "delayed-fireball",
  title: "Delayed Fireball",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
