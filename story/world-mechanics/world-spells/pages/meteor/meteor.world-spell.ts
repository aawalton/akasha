import type { WorldSpell } from "../../world-spell.page-type.ts"

export const meteor = {
  id: "01a06572-95d8-7c3a-b1da-9bda7a2953dc",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "meteor",
  title: "Meteor",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
