import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const magicAnchor = {
  id: "01a06572-95d0-7085-ac7b-5a38c3595afa",
  type: "page-type/world-spell",
  slug: "magic-anchor",
  title: "Magic Anchor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
