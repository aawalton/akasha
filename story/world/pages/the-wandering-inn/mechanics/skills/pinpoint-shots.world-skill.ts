import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinpointShots = {
  id: "01a0657d-0294-743b-99ac-9570f50375cf",
  type: "page-type/world-skill",
  slug: "pinpoint-shots",
  title: "Pinpoint Shots",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
