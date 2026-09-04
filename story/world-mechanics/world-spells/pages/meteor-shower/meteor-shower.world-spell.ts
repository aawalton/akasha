import type { WorldSpell } from "../../world-spell.page-type.ts"

export const meteorShower = {
  id: "01a06572-95d8-7fbc-a369-d4c6d8e96866",
  pageTypeSlug: "world-spell",
  slug: "meteor-shower",
  title: "Meteor Shower",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
