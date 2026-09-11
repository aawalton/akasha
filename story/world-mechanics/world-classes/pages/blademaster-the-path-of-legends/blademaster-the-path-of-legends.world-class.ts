import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const blademasterThePathOfLegends = {
  id: "01a0657e-133f-7f0e-a01d-3ff37e07af8f",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "blademaster-the-path-of-legends",
  title: "Blademaster, the Path of Legends",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["blademaster-of-the-crimson-field"],
  references: "jsonl",
} as const satisfies WorldClass
