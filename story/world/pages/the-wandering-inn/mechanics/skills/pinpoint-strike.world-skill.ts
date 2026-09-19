import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pinpointStrike = {
  id: "01a0657d-0294-705d-93b4-587ec29003de",
  type: "page-type/world-skill",
  slug: "pinpoint-strike",
  title: "Pinpoint Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
