import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const trackQuarry = {
  id: "01a0657d-0316-721d-b662-9e38cedf58e4",
  type: "page-type/world-skill",
  slug: "track-quarry",
  title: "Track Quarry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
