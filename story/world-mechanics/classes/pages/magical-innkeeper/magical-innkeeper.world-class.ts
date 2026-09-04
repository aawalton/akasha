import type { WorldClass } from "../../world-class.page-type.ts"

export const magicalInnkeeper = {
  id: "01a0657e-022b-7d28-8e32-fa635a33232b",
  pageTypeSlug: "world-class",
  slug: "magical-innkeeper",
  title: "Magical Innkeeper",
  worldSlug: "the-wandering-inn",
  evolvesFromSlugs: ["innkeeper"],
  evolvesToSlugs: ["the-wandering-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass
