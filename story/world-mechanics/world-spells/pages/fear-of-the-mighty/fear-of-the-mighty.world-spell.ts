import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const fearOfTheMighty = {
  id: "01a06572-95c0-7fa5-a3a5-946d7a203277",
  type: "world-spell",
  slug: "fear-of-the-mighty",
  title: "Fear of the Mighty",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
