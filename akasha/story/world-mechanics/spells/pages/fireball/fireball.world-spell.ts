import type { WorldSpell } from "../../world-spell.page-type.ts"

export const fireball = {
  id: "01a06572-95c2-741f-886e-95cb617df47d",
  pageTypeSlug: "world-spell",
  slug: "fireball",
  title: "Fireball",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
