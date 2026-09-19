import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overpoweringShot = {
  id: "01a0657d-027f-7616-9956-7aef9c0f2280",
  type: "page-type/world-skill",
  slug: "overpowering-shot",
  title: "Overpowering Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
