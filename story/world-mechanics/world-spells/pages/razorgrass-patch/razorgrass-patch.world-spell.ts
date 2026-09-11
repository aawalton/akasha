import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const razorgrassPatch = {
  id: "01a06572-95dc-7ddb-bbdc-fc26cd7a8684",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "razorgrass-patch",
  title: "Razorgrass Patch",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
