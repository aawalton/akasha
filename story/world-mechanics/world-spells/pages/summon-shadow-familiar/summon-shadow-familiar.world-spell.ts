import type { WorldSpell } from "../../world-spell.page-type.ts"

export const summonShadowFamiliar = {
  id: "01a06572-95e4-7631-8383-b2ccddd738ca",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "summon-shadow-familiar",
  title: "Summon Shadow Familiar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
