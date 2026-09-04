import type { WorldSpell } from "../../world-spell.page-type.ts"

export const wallOfEarth = {
  id: "01a06572-95e8-77b3-8b8b-e4ad8db5f03f",
  pageTypeSlug: "world-spell",
  slug: "wall-of-earth",
  title: "Wall of Earth",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
