import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const distantMirror = {
  id: "01a06572-95be-76a0-a80d-ee5d5971bcf1",
  type: "page-type/world-spell",
  slug: "distant-mirror",
  title: "Distant Mirror",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
