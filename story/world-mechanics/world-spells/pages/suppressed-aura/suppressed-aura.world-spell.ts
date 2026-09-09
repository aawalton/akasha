import type { WorldSpell } from "../../world-spell.page-type.ts"

export const suppressedAura = {
  id: "01a06572-95e4-7f97-be02-922c9e84d34e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "suppressed-aura",
  title: "Suppressed Aura",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
