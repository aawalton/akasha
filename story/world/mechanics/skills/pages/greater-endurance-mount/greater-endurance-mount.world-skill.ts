import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterEnduranceMount = {
  id: "01a06575-9817-731e-9a6a-d1a1fb552764",
  type: "page-type/world-skill",
  slug: "greater-endurance-mount",
  title: "Greater Endurance: Mount",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
