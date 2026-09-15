import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const copycatSpellcaster = {
  id: "01a0657e-01c9-7f70-9237-f390a0e3aa18",
  type: "world-class",
  slug: "copycat-spellcaster",
  title: "Copycat Spellcaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
