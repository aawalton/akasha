import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const bridgeOfTheMartialWorld = {
  id: "01a0657e-1340-78aa-8fdd-fbc3907782e2",
  type: "page-type/world-class",
  slug: "bridge-of-the-martial-world",
  title: "Bridge of the Martial World",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  evolvesToSlugs: ["world-class/strongest-of-the-martial-age"],
  references: "jsonl",
  createdAt: "2026-09-03T04:19:16.416Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldClass
