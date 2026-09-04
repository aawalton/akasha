import type { WorldClass } from "../../world-class.page-type.ts"

export const necromancer = {
  id: "01a0657e-13ab-71e9-83ba-542d4f1b5479",
  pageTypeSlug: "world-class",
  slug: "necromancer",
  title: "Necromancer",
  worldSlug: "the-wandering-inn",
  aliases: ["necromancers"],
  evolvesToSlugs: ["ossific-necromancer"],
  references: "jsonl",
} as const satisfies WorldClass
