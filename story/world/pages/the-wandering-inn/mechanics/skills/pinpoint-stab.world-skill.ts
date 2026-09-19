import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinpointStab = {
  id: "01a0657d-0294-7ce7-9c6d-84d3cbbe82b4",
  type: "page-type/world-skill",
  slug: "pinpoint-stab",
  title: "Pinpoint Stab",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
