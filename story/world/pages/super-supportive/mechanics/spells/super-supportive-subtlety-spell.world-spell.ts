import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const superSupportiveSubtletySpell = {
  id: "01a0e9f9-7734-7539-8d57-1e0400340367",
  type: "page-type/world-spell",
  slug: "super-supportive-subtlety-spell",
  title: "Subtlety spell",
  world: "world/super-supportive",
  description: "A spell that makes one's presence go unnoticed.",
} as const satisfies WorldSpell
