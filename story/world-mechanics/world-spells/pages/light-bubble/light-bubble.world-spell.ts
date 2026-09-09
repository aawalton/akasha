import type { WorldSpell } from "../../world-spell.page-type.ts"

export const lightBubble = {
  id: "01a06572-95ce-76d1-9546-3cf37663e552",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "light-bubble",
  title: "Light Bubble",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
