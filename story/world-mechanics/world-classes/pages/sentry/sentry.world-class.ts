import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const sentry = {
  id: "01a0657e-024c-7260-99f7-8ade0d6d261d",
  pageTypeSlug: "world-class",
  type: "world-class",
  slug: "sentry",
  title: "Sentry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
