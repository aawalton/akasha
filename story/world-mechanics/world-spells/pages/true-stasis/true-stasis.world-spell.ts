import type { WorldSpell } from "../../world-spell.page-type.ts"

export const trueStasis = {
  id: "01a06572-95e7-7b31-9be3-a06b0c6ae576",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "true-stasis",
  title: "True Stasis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
