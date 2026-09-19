import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const weakenMuscles = {
  id: "01a06572-95e9-7f62-9ffe-fa9d2554a14d",
  type: "page-type/world-spell",
  slug: "weaken-muscles",
  title: "Weaken Muscles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
