import type { WorldClass } from "../world-class.page-type.ts"

export const goblinChieftain = {
  id: "01a0657e-136c-7580-90cf-630687904d94",
  pageTypeSlug: "world-class",
  slug: "goblin-chieftain",
  title: "Goblin Chieftain",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["chieftain-of-the-maw"],
} as const satisfies WorldClass
