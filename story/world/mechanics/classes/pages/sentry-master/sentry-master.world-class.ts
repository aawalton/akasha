import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sentryMaster = {
  id: "01a06586-0a2f-708f-9962-fd38bb5b2b07",
  type: "page-type/world-class",
  slug: "sentry-master",
  title: "Sentry Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
