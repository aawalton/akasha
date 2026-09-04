import type { WorldClass } from "../../world-class.page-type.ts"

export const strategist = {
  id: "01a06586-0a5a-7ce5-93f6-3787e8b90c33",
  pageTypeSlug: "world-class",
  slug: "strategist",
  title: "Strategist",
  worldSlug: "the-wandering-inn",
  aliases: ["strategists"],
  evolvesToSlugs: ["eleleu-strategos"],
  references: "jsonl",
} as const satisfies WorldClass
