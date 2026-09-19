import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinpointDistanceShot = {
  id: "01a0657d-0294-7ab0-8439-c9f7b8ca8276",
  type: "page-type/world-skill",
  slug: "pinpoint-distance-shot",
  title: "Pinpoint Distance Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
