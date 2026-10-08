import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const archivalStoryteller = {
  id: "01a0657e-132f-7898-b39a-4a244b330e85",
  type: "page-type/world-class",
  slug: "archival-storyteller",
  title: "Archival Storyteller",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  evolvesToSlugs: ["world-class/historian-of-the-world"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.399Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
