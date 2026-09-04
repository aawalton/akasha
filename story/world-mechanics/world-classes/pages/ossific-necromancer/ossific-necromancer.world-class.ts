import type { WorldClass } from "../../world-class.page-type.ts"

export const ossificNecromancer = {
  id: "01a0657e-0235-7adf-8500-1df13c2e0442",
  pageTypeSlug: "world-class",
  slug: "ossific-necromancer",
  title: "Ossific Necromancer",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["necromancer"],
  evolvesToSlugs: ["deathbane-necromancer"],
  references: "jsonl",
} as const satisfies WorldClass
