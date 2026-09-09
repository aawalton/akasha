import type { WorldSpell } from "../../world-spell.page-type.ts"

export const manaFamiliar = {
  id: "01a06572-95d1-7569-89ad-5ce9c23be2c3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mana-familiar",
  title: "Mana Familiar",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
