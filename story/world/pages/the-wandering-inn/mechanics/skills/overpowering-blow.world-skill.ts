import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const overpoweringBlow = {
  id: "01a0657d-027f-7db8-8bc9-48e77d1f50ec",
  type: "page-type/world-skill",
  slug: "overpowering-blow",
  title: "Overpowering Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
