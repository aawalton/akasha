import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const friendAndFoeVision = {
  id: "01a06575-9811-7d9c-a93b-bea92894ee9e",
  type: "page-type/world-skill",
  slug: "friend-and-foe-vision",
  title: "Friend-And-Foe Vision",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
