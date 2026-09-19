import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const valeterisaSComet = {
  id: "01a06572-95e8-76a2-89dd-527438cc5765",
  type: "page-type/world-spell",
  slug: "valeterisa-s-comet",
  title: "Valeterisa’s Comet",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
