import type { WorldClass } from "akasha/story/world-mechanics/world-classes/world-class.page-type.types.ts"

export const relicGuardian = {
  id: "01a06586-0a20-77c5-97ce-f0be4fbafff9",
  type: "world-class",
  slug: "relic-guardian",
  title: "Relic Guardian",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
