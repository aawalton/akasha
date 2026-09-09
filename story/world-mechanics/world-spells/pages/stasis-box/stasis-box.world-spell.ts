import type { WorldSpell } from "../../world-spell.page-type.ts"

export const stasisBox = {
  id: "01a06572-95e2-7858-8b02-ecf3bbf871e0",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "stasis-box",
  title: "Stasis Box",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
