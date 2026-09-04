import type { WorldSpell } from "../../world-spell.page-type.ts"

export const healWounds = {
  id: "01a06572-95c8-73db-a02a-a7a648852100",
  pageTypeSlug: "world-spell",
  slug: "heal-wounds",
  title: "Heal Wounds",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
