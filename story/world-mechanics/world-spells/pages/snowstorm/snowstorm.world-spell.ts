import type { WorldSpell } from "../../world-spell.page-type.ts"

export const snowstorm = {
  id: "01a06572-95e1-70f5-a328-ee5e84a1dc5b",
  pageTypeSlug: "world-spell",
  slug: "snowstorm",
  title: "Snowstorm",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
