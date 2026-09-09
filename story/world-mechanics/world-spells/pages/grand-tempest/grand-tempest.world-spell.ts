import type { WorldSpell } from "../../world-spell.page-type.ts"

export const grandTempest = {
  id: "01a06572-95c6-75ba-9871-0c77490e5ef8",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "grand-tempest",
  title: "Grand Tempest",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
