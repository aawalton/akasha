import type { WorldClass } from "../../world-class.page-type.ts"

export const sisterOfTheUnforgotten = {
  id: "01a06586-0a3e-7195-a59f-a1e880ac4cf5",
  pageTypeSlug: "world-class",
  slug: "sister-of-the-unforgotten",
  title: "Sister of the Unforgotten",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["covert-wing-captain"],
  references: "jsonl",
} as const satisfies WorldClass
