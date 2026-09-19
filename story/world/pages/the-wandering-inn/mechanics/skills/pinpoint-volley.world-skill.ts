import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinpointVolley = {
  id: "01a0657d-0294-7463-bf12-32bd7c93e0c9",
  type: "page-type/world-skill",
  slug: "pinpoint-volley",
  title: "Pinpoint Volley",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
