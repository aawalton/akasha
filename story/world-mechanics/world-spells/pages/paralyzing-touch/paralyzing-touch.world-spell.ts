import type { WorldSpell } from "../../world-spell.page-type.ts"

export const paralyzingTouch = {
  id: "01a06572-95da-74dd-8af2-bb21b01a997b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "paralyzing-touch",
  title: "Paralyzing Touch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
