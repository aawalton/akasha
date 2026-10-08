import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const emberbearer = {
  id: "01a0657e-1359-7d90-a50b-237ac95f8651",
  type: "page-type/world-class",
  slug: "emberbearer",
  title: "Emberbearer",
  world: "world/the-wandering-inn",
  appearanceCount: 16,
  evolvesToSlugs: ["world-class/fatebreaker-child"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.441Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
