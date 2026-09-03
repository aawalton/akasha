import type { WorldClass } from "../../world-class.page-type.ts"

export const historianOfTheWorld = {
  id: "01a0657e-01f8-73d4-bb22-9768f95a3da8",
  pageTypeSlug: "world-class",
  slug: "historian-of-the-world",
  title: "Historian of the World",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["archival-storyteller"],
  references: "jsonl",
} as const satisfies WorldClass
