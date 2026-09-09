import type { WorldSpell } from "../../world-spell.page-type.ts"

export const manaOrb = {
  id: "01a06572-95d1-712f-bfdd-a58f648b5a72",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mana-orb",
  title: "Mana Orb",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
