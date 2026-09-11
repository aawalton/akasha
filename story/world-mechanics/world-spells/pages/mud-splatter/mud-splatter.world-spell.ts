import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mudSplatter = {
  id: "01a06572-95d9-7950-874b-0decc99f89c4",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "mud-splatter",
  title: "Mud Splatter",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
