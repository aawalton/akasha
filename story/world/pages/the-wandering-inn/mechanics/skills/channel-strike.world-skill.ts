import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const channelStrike = {
  id: "01a06575-97fa-778b-814b-4209c609b22d",
  type: "page-type/world-skill",
  slug: "channel-strike",
  title: "Channel Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
