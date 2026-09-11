import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const resplendentIllumination = {
  id: "01a06572-95dd-7c7b-896e-c7876ea23049",
  type: "world-spell",
  slug: "resplendent-illumination",
  title: "Resplendent Illumination",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
