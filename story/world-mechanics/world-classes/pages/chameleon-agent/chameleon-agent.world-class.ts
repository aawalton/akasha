import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const chameleonAgent = {
  id: "01a0657e-1347-794e-853b-35621760e7fa",
  type: "world-class",
  slug: "chameleon-agent",
  title: "Chameleon Agent",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
