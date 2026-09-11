import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const burstOfSpeed = {
  id: "01a06572-95b8-74c6-b15f-96e1cde68d49",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "burst-of-speed",
  title: "Burst of Speed",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
