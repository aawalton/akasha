import type { WorldSpell } from "../../world-spell.page-type.ts"

export const heartOfDarkness = {
  id: "01a06572-95c8-741f-b1d8-1892e527a7a3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "heart-of-darkness",
  title: "Heart of Darkness",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
