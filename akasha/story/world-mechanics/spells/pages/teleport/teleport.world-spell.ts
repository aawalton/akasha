import type { WorldSpell } from "../../world-spell.page-type.ts"

export const teleport = {
  id: "01a06572-95e6-7a17-96ff-0bfb3117a1ad",
  pageTypeSlug: "world-spell",
  slug: "teleport",
  title: "Teleport",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
