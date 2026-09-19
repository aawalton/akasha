import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const security = {
  id: "01a0657e-024c-7ceb-a1ec-e4f46cf32d68",
  type: "page-type/world-class",
  slug: "security",
  title: "Security",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
