import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const honestJournalist = {
  id: "01a0657e-1374-71a3-8233-3cbb2141b358",
  type: "world-class",
  slug: "honest-journalist",
  title: "Honest Journalist",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
