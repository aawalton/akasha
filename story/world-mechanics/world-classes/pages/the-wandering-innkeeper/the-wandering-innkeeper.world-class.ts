import type { WorldClass } from "../../world-class.page-type.ts"

export const theWanderingInnkeeper = {
  id: "01a06586-0a65-702e-8199-a14728ad961a",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "the-wandering-innkeeper",
  title: "The Wandering Innkeeper",
  world: "the-wandering-inn",
  evolvesFromSlugs: ["magical-innkeeper"],
  references: "jsonl",
} as const satisfies WorldClass
