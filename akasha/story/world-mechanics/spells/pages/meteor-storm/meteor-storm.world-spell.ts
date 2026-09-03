import type { WorldSpell } from "../../world-spell.page-type.ts"

export const meteorStorm = {
  id: "01a06572-95d8-769c-a7b3-2ea271f1c300",
  pageTypeSlug: "world-spell",
  slug: "meteor-storm",
  title: "Meteor Storm",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
