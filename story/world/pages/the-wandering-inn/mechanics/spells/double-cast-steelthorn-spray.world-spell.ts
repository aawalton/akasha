import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const doubleCastSteelthornSpray = {
  id: "01a06572-95be-7375-82ea-242a3f63bc03",
  type: "page-type/world-spell",
  slug: "double-cast-steelthorn-spray",
  title: "Double Cast: Steelthorn Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
