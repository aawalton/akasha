import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const plagueOfLice = {
  id: "01a06572-95db-74bb-8b01-49e74a411a24",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "plague-of-lice",
  title: "Plague of Lice",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
