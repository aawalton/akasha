import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const iceDagger = {
  id: "01a06572-95c9-73d8-bf99-cfcb59686d7a",
  type: "page-type/world-spell",
  slug: "ice-dagger",
  title: "Ice Dagger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
