import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const earthClod = {
  id: "01a06572-95be-71bc-a433-cf332d64b1de",
  type: "world-spell",
  slug: "earth-clod",
  title: "Earth Clod",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
