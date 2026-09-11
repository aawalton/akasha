import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bugCollector = {
  id: "01a0657e-1341-7b99-a796-ae9c3b97ad3c",
  type: "world-class",
  slug: "bug-collector",
  title: "Bug Collector",
  world: "the-wandering-inn",
  evolvesToSlugs: ["ant-farmer"],
  references: "jsonl",
} as const satisfies WorldClass
