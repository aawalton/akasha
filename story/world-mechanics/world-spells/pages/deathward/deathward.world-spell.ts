import type { WorldSpell } from "../../world-spell.page-type.ts"

export const deathward = {
  id: "01a06572-95bc-766f-9baa-f3d49b6fe1f2",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "deathward",
  title: "Deathward",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
