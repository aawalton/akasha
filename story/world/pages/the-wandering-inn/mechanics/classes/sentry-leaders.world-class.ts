import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sentryLeaders = {
  id: "01a0657e-024c-72f4-b0ac-154c822d9c75",
  type: "page-type/world-class",
  slug: "sentry-leaders",
  title: "Sentry Leaders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
