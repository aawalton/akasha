import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const message = {
  id: "01a06572-95d7-701a-a2f8-0fd8d4508f32",
  type: "world-spell",
  slug: "message",
  title: "Message",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
