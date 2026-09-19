import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const spearDances = {
  id: "01a0657d-02ec-77bb-96e7-5546e78546f8",
  type: "page-type/world-skill",
  slug: "spear-dances",
  title: "Spear Dances",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
