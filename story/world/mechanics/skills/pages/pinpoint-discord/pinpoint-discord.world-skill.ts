import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinpointDiscord = {
  id: "01a0657d-0294-7627-8748-529700051954",
  type: "page-type/world-skill",
  slug: "pinpoint-discord",
  title: "Pinpoint Discord",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
