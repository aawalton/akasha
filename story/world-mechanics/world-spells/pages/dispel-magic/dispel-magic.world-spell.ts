import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const dispelMagic = {
  id: "01a06572-95be-7347-ae9f-b4cac17363f0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dispel-magic",
  title: "Dispel Magic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
