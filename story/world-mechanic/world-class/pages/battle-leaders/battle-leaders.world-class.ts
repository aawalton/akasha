import type { WorldClass } from "akasha/story/world-mechanic/world-class/world-class.page-type.types.ts"

export const battleLeaders = {
  id: "01a0657e-01b5-7f54-80a3-6dee7b3ab3eb",
  type: "world-class",
  slug: "battle-leaders",
  title: "Battle Leaders",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldClass
