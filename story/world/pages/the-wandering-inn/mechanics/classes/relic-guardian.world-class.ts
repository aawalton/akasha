import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const relicGuardian = {
  id: "01a06586-0a20-77c5-97ce-f0be4fbafff9",
  type: "page-type/world-class",
  slug: "relic-guardian",
  title: "Relic Guardian",
  world: "world/the-wandering-inn",
  appearanceCount: 6,
  references: "jsonl",
  createdAt: "2026-09-03T04:27:58.368Z",
  updatedAt: "2026-09-22T13:29:51.000Z",
} as const satisfies WorldClass
