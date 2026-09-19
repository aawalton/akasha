import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const eagleSEyes = {
  id: "01a06572-95be-796e-a080-287d5d97572f",
  type: "page-type/world-spell",
  slug: "eagle-s-eyes",
  title: "Eagle’s Eyes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
