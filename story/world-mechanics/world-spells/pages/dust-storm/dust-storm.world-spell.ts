import type { WorldSpell } from "../../world-spell.page-type.ts"

export const dustStorm = {
  id: "01a06572-95be-78a0-9ee0-f2eff4710f1b",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "dust-storm",
  title: "Dust Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
