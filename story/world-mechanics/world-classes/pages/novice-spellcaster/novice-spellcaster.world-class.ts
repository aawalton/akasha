import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const noviceSpellcaster = {
  id: "01a0657e-0235-786a-87d8-f3d00da5688b",
  type: "world-class",
  slug: "novice-spellcaster",
  title: "Novice Spellcaster",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
