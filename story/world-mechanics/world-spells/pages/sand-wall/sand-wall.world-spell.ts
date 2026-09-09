import type { WorldSpell } from "../../world-spell.page-type.ts"

export const sandWall = {
  id: "01a06572-95de-7528-ae77-ffab5e7d4e51",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "sand-wall",
  title: "Sand Wall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
