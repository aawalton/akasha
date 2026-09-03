import type { WorldClass } from "../../world-class.page-type.ts"

export const deathbaneNecromancer = {
  id: "01a0657e-01cf-72c1-bf7c-218f52f85227",
  pageTypeSlug: "world-class",
  slug: "deathbane-necromancer",
  title: "Deathbane Necromancer",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["ossific-necromancer"],
  evolvesToSlugs: ["necromancer-of-reclaimed-grandeur"],
  references: "jsonl",
} as const satisfies WorldClass
