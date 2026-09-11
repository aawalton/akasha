import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mudToStone = {
  id: "01a06572-95d9-79b9-b5d1-d4edc06dfefb",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mud-to-stone",
  title: "Mud to Stone",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
