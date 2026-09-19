import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const donTShootTheMessenger = {
  id: "01a06575-9804-7035-8d41-b982a95f4b11",
  type: "page-type/world-skill",
  slug: "don-t-shoot-the-messenger",
  title: "Don’t Shoot the Messenger",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
