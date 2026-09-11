import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const steelskin = {
  id: "01a06572-95e3-7cb7-8278-000b2fbfcb09",
  type: "world-spell",
  slug: "steelskin",
  title: "Steelskin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
