import type { WorldSpell } from "../../world-spell.page-type.ts"

export const iceDagger = {
  id: "01a06572-95c9-73d8-bf99-cfcb59686d7a",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "ice-dagger",
  title: "Ice Dagger",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
