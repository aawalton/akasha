import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bugCollector = {
  id: "01a0657e-1341-7b99-a796-ae9c3b97ad3c",
  type: "page-type/world-class",
  slug: "bug-collector",
  title: "Bug Collector",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/ant-farmer"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.417Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
