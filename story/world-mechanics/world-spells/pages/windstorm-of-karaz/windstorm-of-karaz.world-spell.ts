import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const windstormOfKaraz = {
  id: "01a06572-95ea-7efb-b565-9bdae18b4f05",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "windstorm-of-karaz",
  title: "Windstorm of Karaz",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
