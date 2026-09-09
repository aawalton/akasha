import type { WorldSpell } from "../../world-spell.page-type.ts"

export const fear = {
  id: "01a06572-95c0-7ab6-82f4-a27a69351712",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "fear",
  title: "Fear",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
