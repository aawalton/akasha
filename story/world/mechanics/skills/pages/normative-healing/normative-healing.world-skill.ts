import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const normativeHealing = {
  id: "01a0657d-027b-75fd-b343-81f9f223a650",
  type: "page-type/world-skill",
  slug: "normative-healing",
  title: "Normative Healing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
