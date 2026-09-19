import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const stoneShell = {
  id: "01a06572-95e3-716b-abf7-95d76e17700d",
  type: "page-type/world-spell",
  slug: "stone-shell",
  title: "Stone Shell",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
