import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const thunderStep = {
  id: "01a06572-95e7-7b00-a6ac-4bbda7fade13",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "thunder-step",
  title: "Thunder Step",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
