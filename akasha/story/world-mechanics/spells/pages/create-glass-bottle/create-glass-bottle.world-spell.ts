import type { WorldSpell } from "../../world-spell.page-type.ts"

export const createGlassBottle = {
  id: "01a06572-95bb-7333-83a0-afda29173882",
  pageTypeSlug: "world-spell",
  slug: "create-glass-bottle",
  title: "Create Glass Bottle",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
