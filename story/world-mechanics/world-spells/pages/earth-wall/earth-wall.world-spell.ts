import type { WorldSpell } from "../../world-spell.page-type.ts"

export const earthWall = {
  id: "01a06572-95be-75f5-9fa1-0e2a4988808a",
  pageTypeSlug: "world-spell",
  slug: "earth-wall",
  title: "Earth Wall",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
