import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const chieftainOfTheMaw = {
  id: "01a0657e-01c5-7a03-9ec9-6b017ed60a4c",
  type: "page-type/world-class",
  slug: "chieftain-of-the-maw",
  title: "Chieftain of the Maw",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  evolvesFromSlugs: ["world-class/goblin-chieftain"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:11.941Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
