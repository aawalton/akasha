import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const isolatedMagic = {
  id: "01a06572-95cc-708e-8bf7-bc04a4f92e99",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "isolated-magic",
  title: "Isolated Magic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
