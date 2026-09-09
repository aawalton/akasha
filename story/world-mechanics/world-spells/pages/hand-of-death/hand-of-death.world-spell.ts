import type { WorldSpell } from "../../world-spell.page-type.ts"

export const handOfDeath = {
  id: "01a06572-95c8-73d6-9686-d987e6203b8e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "hand-of-death",
  title: "Hand of Death",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
