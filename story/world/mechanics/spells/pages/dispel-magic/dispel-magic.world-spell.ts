import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const dispelMagic = {
  id: "01a06572-95be-7347-ae9f-b4cac17363f0",
  type: "page-type/world-spell",
  slug: "dispel-magic",
  title: "Dispel Magic",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
