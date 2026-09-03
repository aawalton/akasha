import type { WorldClass } from "../../world-class.page-type.ts"

export const braveSkirmisher = {
  id: "01a0657e-1340-7135-9b05-39d98054c81e",
  pageTypeSlug: "world-class",
  slug: "brave-skirmisher",
  title: "Brave Skirmisher",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["skirmisher"],
  references: "jsonl",
} as const satisfies WorldClass
