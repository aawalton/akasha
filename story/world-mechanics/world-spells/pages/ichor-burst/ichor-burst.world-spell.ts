import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const ichorBurst = {
  id: "01a06572-95ca-7fd0-b8f9-cd8214c8ef36",
  type: "world-spell",
  slug: "ichor-burst",
  title: "Ichor Burst",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
