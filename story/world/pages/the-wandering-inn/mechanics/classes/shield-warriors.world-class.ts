import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldWarriors = {
  id: "01a06586-0a3a-7526-9a79-6dd25d587ada",
  type: "page-type/world-class",
  slug: "shield-warriors",
  title: "Shield Warriors",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
