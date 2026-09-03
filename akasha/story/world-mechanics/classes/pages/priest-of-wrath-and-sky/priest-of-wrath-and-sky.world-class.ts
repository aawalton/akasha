import type { WorldClass } from "../../world-class.page-type.ts"

export const priestOfWrathAndSky = {
  id: "01a06586-0a0b-7d99-a1dd-ccc05902ac1d",
  pageTypeSlug: "world-class",
  slug: "priest-of-wrath-and-sky",
  title: "Priest of Wrath and Sky",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["doomspeaker-priest"],
  references: "jsonl",
} as const satisfies WorldClass
