import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const arenaMaster = {
  id: "01a0657e-01ab-7fdd-b265-6933f053e891",
  type: "page-type/world-class",
  slug: "arena-master",
  title: "Arena Master",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
