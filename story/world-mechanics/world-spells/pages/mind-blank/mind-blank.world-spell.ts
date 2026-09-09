import type { WorldSpell } from "../../world-spell.page-type.ts"

export const mindBlank = {
  id: "01a06572-95d9-71c8-8867-96d16d36d6a7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mind-blank",
  title: "Mind Blank",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
