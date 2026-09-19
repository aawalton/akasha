import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sentrymaster = {
  id: "01a06586-0a2f-7902-b931-8f83777c2e94",
  type: "page-type/world-class",
  slug: "sentrymaster",
  title: "Sentrymaster",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
