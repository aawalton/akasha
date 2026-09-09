import type { WorldClass } from "../../world-class.page-type.ts"

export const tactician = {
  id: "01a06586-0a63-75fa-a6d2-dda474db1dd8",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "tactician",
  title: "Tactician",
  world: "the-wandering-inn",
  aliases: ["tacticians"],
  evolvesToSlugs: ["strategist-of-sympathy"],
  references: "jsonl",
} as const satisfies WorldClass
