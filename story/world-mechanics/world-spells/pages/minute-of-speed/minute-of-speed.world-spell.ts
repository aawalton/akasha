import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const minuteOfSpeed = {
  id: "01a06572-95d9-71ab-ad9d-b7f2d53c69d5",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "minute-of-speed",
  title: "Minute of Speed",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
