import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const stealthBards = {
  id: "01a06586-0a53-7806-a3ae-8f72ed2f8999",
  type: "world-class",
  slug: "stealth-bards",
  title: "Stealth Bards",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
