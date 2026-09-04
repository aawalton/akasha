import type { WorldClass } from "../../world-class.page-type.ts"

export const sniper = {
  id: "01a06586-0a45-781d-b28d-6a1f907ed931",
  pageTypeSlug: "world-class",
  slug: "sniper",
  title: "Sniper",
  worldSlug: "the-wandering-inn",
  aliases: ["snipers"],
  evolvesFromSlugs: ["archer"],
  references: "jsonl",
} as const satisfies WorldClass
