import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const headstrongHealer = {
  id: "01a0657e-1371-7540-a5dd-0359efbf129e",
  type: "page-type/world-class",
  slug: "headstrong-healer",
  title: "Headstrong Healer",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesFromSlugs: ["world-class/healer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.465Z",
  updatedAt: "2026-09-22T18:27:39.000Z",
} as const satisfies WorldClass
