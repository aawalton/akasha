import type { WorldCurse } from "akasha/story/world/mechanics/curses/world-curse.page-type.types.ts"

export const vitalityOfTheUndead = {
  id: "01a0655a-0687-74e3-bfef-c7e957e4c917",
  type: "page-type/world-curse",
  slug: "vitality-of-the-undead",
  title: "Vitality of the Undead",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldCurse
