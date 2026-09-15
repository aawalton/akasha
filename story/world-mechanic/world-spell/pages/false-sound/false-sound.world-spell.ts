import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const falseSound = {
  id: "01a06572-95bf-7ba0-9270-5ebb747e32c4",
  type: "world-spell",
  slug: "false-sound",
  title: "False Sound",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
