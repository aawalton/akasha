import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const apprenticeSmiths = {
  id: "01a0657e-01a8-73e8-89fb-44fdca814b00",
  type: "world-class",
  slug: "apprentice-smiths",
  title: "Apprentice Smiths",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
