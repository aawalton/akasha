import type { WorldClass } from "../../world-class.page-type.ts"

export const bugCollector = {
  id: "01a0657e-1341-7b99-a796-ae9c3b97ad3c",
  pageTypeSlug: "world-class",
  slug: "bug-collector",
  title: "Bug Collector",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["ant-farmer"],
  references: "jsonl",
} as const satisfies WorldClass
