import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const reflectionStave = {
  id: "01a0657d-02a6-741d-9149-9942e0454894",
  type: "page-type/world-skill",
  slug: "reflection-stave",
  title: "Reflection Stave",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
