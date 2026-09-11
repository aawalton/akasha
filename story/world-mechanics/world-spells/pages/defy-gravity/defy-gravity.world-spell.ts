import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const defyGravity = {
  id: "01a06572-95bc-744f-a757-127ce1543b6e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "defy-gravity",
  title: "Defy Gravity",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
