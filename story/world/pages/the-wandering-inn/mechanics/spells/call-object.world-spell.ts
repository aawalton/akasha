import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const callObject = {
  id: "01a06572-95b8-7a5b-a8ae-4da95930739f",
  type: "page-type/world-spell",
  slug: "call-object",
  title: "Call Object",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
