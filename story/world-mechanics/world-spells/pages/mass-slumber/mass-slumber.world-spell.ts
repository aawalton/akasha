import type { WorldSpell } from "../../world-spell.page-type.ts"

export const massSlumber = {
  id: "01a06572-95d2-7cc3-a2d2-ca8bbea8ec12",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mass-slumber",
  title: "Mass Slumber",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
