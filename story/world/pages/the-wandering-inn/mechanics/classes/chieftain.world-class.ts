import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chieftain = {
  id: "01a0657e-01c6-7717-875b-16e088a07d18",
  type: "page-type/world-class",
  slug: "chieftain",
  title: "Chieftain",
  world: "world/the-wandering-inn",
  appearanceCount: 95,
  aliases: ["chieftains"],
  evolvesFromSlugs: ["world-class/leader"],
  references: "jsonl",
} as const satisfies WorldClass
