import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const executionOfFoes = {
  id: "01a06572-95bf-7adb-bbd3-fbcf0c3282a6",
  type: "page-type/world-spell",
  slug: "execution-of-foes",
  title: "Execution of Foes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
