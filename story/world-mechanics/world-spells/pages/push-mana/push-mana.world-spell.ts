import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const pushMana = {
  id: "01a06572-95db-789e-83af-a23fbfe87dbf",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "push-mana",
  title: "Push Mana",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
