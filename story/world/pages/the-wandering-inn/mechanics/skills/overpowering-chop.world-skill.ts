import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overpoweringChop = {
  id: "01a0657d-027f-7118-b0b0-2cb5669e2ff7",
  type: "page-type/world-skill",
  slug: "overpowering-chop",
  title: "Overpowering Chop",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
