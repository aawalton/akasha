import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const burstOfGreaterStrength = {
  id: "01a06575-97f9-79a9-8af3-2936263758b6",
  type: "page-type/world-skill",
  slug: "burst-of-greater-strength",
  title: "Burst of Greater Strength",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
