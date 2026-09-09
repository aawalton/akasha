import type { WorldSpell } from "../../world-spell.page-type.ts"

export const greaterScry = {
  id: "01a06572-95c7-7221-84c9-09729771ae71",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "greater-scry",
  title: "Greater Scry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
