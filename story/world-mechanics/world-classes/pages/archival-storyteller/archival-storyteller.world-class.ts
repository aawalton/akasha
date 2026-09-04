import type { WorldClass } from "../../world-class.page-type.ts"

export const archivalStoryteller = {
  id: "01a0657e-132f-7898-b39a-4a244b330e85",
  pageTypeSlug: "world-class",
  slug: "archival-storyteller",
  title: "Archival Storyteller",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["historian-of-the-world"],
  references: "jsonl",
} as const satisfies WorldClass
