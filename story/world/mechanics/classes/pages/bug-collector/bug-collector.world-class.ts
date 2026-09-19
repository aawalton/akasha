import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bugCollector = {
  id: "01a0657e-1341-7b99-a796-ae9c3b97ad3c",
  type: "page-type/world-class",
  slug: "bug-collector",
  title: "Bug Collector",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["ant-farmer"],
  references: "jsonl",
} as const satisfies WorldClass
