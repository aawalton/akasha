import type { WorldClass } from "../../world-class.page-type.ts"

export const doomspeakerPriest = {
  id: "01a0657e-1356-7e2e-b5df-cff8ab9834e7",
  pageTypeSlug: "world-class",
  slug: "doomspeaker-priest",
  title: "Doomspeaker Priest",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["priest-of-wrath-and-sky"],
  references: "jsonl",
} as const satisfies WorldClass
