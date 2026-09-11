import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const unlockObject = {
  id: "01a06572-95e8-75a7-a4b5-36c54f611f2d",
  type: "world-spell",
  slug: "unlock-object",
  title: "Unlock Object",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
