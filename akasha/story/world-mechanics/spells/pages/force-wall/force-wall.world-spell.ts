import type { WorldSpell } from "../../world-spell.page-type.ts"

export const forceWall = {
  id: "01a06572-95c5-74ff-9fae-efba9cf4fa43",
  pageTypeSlug: "world-spell",
  slug: "force-wall",
  title: "Force Wall",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
