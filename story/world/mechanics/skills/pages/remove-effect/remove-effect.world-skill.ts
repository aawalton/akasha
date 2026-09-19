import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const removeEffect = {
  id: "01a0657d-02b0-7059-885a-ede203670199",
  type: "page-type/world-skill",
  slug: "remove-effect",
  title: "Remove Effect",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
