import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bridgeOfTheMartialWorld = {
  id: "01a0657e-1340-78aa-8fdd-fbc3907782e2",
  type: "world-class",
  slug: "bridge-of-the-martial-world",
  title: "Bridge of the Martial World",
  world: "the-wandering-inn",
  evolvesToSlugs: ["strongest-of-the-martial-age"],
  references: "jsonl",
} as const satisfies WorldClass
