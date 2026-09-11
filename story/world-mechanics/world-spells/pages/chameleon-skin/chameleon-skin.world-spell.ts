import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const chameleonSkin = {
  id: "01a06572-95b8-7334-9517-b6766f18bc16",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "chameleon-skin",
  title: "Chameleon Skin",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
