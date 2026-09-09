import type { WorldSpell } from "../../world-spell.page-type.ts"

export const detectDeath = {
  id: "01a06572-95bc-749f-9b8c-378c2d597e86",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "detect-death",
  title: "Detect Death",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
