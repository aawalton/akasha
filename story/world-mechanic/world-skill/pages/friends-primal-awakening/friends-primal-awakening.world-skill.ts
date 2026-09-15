import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const friendsPrimalAwakening = {
  id: "01a06575-9811-7a54-aa69-f6e306c3f1ff",
  type: "world-skill",
  slug: "friends-primal-awakening",
  title: "Friends: Primal Awakening",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
