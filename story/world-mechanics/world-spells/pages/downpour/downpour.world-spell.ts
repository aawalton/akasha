import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const downpour = {
  id: "01a06572-95be-7a13-bf92-e046bacb3b27",
  type: "world-spell",
  slug: "downpour",
  title: "Downpour",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
