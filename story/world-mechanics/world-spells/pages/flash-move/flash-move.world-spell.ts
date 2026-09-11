import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const flashMove = {
  id: "01a06572-95c3-7df1-8a8f-5fb2718ec2a9",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "flash-move",
  title: "Flash Move",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
