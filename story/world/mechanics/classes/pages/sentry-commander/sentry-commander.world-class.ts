import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const sentryCommander = {
  id: "01a0657e-024c-7272-8602-dc7c0ef6f51e",
  type: "page-type/world-class",
  slug: "sentry-commander",
  title: "Sentry Commander",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
