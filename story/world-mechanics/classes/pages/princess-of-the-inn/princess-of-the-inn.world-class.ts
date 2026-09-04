import type { WorldClass } from "../../world-class.page-type.ts"

export const princessOfTheInn = {
  id: "01a06586-0a0e-7fe5-aa9e-91578b10d83f",
  pageTypeSlug: "world-class",
  slug: "princess-of-the-inn",
  title: "Princess of the Inn",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["the-cracked-princess-keeper-of-the-inn"],
  references: "jsonl",
} as const satisfies WorldClass
