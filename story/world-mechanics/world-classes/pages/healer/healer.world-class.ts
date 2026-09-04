import type { WorldClass } from "../../world-class.page-type.ts"

export const healer = {
  id: "01a0657e-01f6-7f07-8177-76aa311e62d7",
  pageTypeSlug: "world-class",
  slug: "healer",
  title: "Healer",
  worldSlug: "the-wandering-inn",
  aliases: ["healers"],
  evolvesToSlugs: ["headstrong-healer"],
  references: "jsonl",
} as const satisfies WorldClass
