import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const neutralizeElement = {
  id: "01a0657d-027b-7eaa-823d-4fc1d9f840e1",
  type: "page-type/world-skill",
  slug: "neutralize-element",
  title: "Neutralize Element",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
