import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightningTempest = {
  id: "01a06572-95d0-79e2-a426-633358bb9e04",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "lightning-tempest",
  title: "Lightning Tempest",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
