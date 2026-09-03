import type { WorldClass } from "../../world-class.page-type.ts"

export const cursedPrincess = {
  id: "01a0657e-1351-71a2-b45e-38b2375c3558",
  pageTypeSlug: "world-class",
  slug: "cursed-princess",
  title: "Cursed Princess",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["deathtouch-princess"],
  evolvesToSlugs: ["curse-bearer-princess"],
  references: "jsonl",
} as const satisfies WorldClass
