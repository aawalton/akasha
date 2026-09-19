import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const strikeMyShield = {
  id: "01a0657d-02fe-729f-a176-66d1e5642578",
  type: "page-type/world-skill",
  slug: "strike-my-shield",
  title: "Strike my Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
