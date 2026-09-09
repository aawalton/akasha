import type { WorldSpell } from "../../world-spell.page-type.ts"

export const mysteriousBubble = {
  id: "01a06572-95d9-7ffd-aab6-40ec0c77efa3",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mysterious-bubble",
  title: "Mysterious Bubble",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
