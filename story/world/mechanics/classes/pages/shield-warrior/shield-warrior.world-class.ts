import type { WorldClass } from "akasha/story/world/mechanics/classes/world-class.page-type.types.ts"

export const shieldWarrior = {
  id: "01a0657e-0254-7d91-877c-36cffcfe91fa",
  type: "page-type/world-class",
  slug: "shield-warrior",
  title: "Shield Warrior",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
