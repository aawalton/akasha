import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightningBolt = {
  id: "01a06572-95cf-7864-a35b-d7ce204fce69",
  pageTypeSlug: "world-spell",
  slug: "lightning-bolt",
  title: "Lightning Bolt",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
