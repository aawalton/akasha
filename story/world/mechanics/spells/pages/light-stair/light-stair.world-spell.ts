import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const lightStair = {
  id: "01a06572-95ce-7039-822f-e041dba40961",
  type: "page-type/world-spell",
  slug: "light-stair",
  title: "Light Stair",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
