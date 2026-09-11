import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const valmiraSComets = {
  id: "01a06572-95e8-7867-aa14-c14bd862952d",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "valmira-s-comets",
  title: "Valmira’s Comets",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
