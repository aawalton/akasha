import type { WorldSpell } from "../../world-spell.page-type.ts"

export const firestorm = {
  id: "01a06572-95c3-7e49-9c15-17b0bb49032e",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "firestorm",
  title: "Firestorm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
