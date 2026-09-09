import type { WorldSpell } from "../../world-spell.page-type.ts"

export const clonePerson = {
  id: "01a06572-95b9-787f-bf83-58e7bcd7159d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "clone-person",
  title: "Clone Person",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
