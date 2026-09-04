import type { WorldSpell } from "../../world-spell.page-type.ts"

export const isolatedMagic = {
  id: "01a06572-95cc-708e-8bf7-bc04a4f92e99",
  pageTypeSlug: "world-spell",
  slug: "isolated-magic",
  title: "Isolated Magic",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
