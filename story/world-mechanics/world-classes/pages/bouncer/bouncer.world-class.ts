import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const bouncer = {
  id: "01a0657e-133f-72f1-97ca-6407e08be478",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "bouncer",
  title: "Bouncer",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
