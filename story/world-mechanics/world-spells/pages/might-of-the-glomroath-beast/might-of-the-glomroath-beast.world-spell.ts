import type { WorldSpell } from "akasha/story/world-mechanics/world-spells/world-spell.page-type.types.ts"

export const mightOfTheGlomroathBeast = {
  id: "01a06572-95d9-7c22-9c6e-1257cd81aff7",
  pageTypeSlug: "world-spell",
  type: "world-spell",
  slug: "might-of-the-glomroath-beast",
  title: "Might of the Glomroath Beast",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
