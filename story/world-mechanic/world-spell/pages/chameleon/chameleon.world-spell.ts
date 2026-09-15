import type { WorldSpell } from "akasha/story/world-mechanic/world-spell/world-spell.page-type.types.ts"

export const chameleon = {
  id: "01a06572-95b8-7ab0-bf49-80a12b5976b6",
  type: "world-spell",
  slug: "chameleon",
  title: "Chameleon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
