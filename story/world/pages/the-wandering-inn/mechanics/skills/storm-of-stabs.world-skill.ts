import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stormOfStabs = {
  id: "01a0657d-02fb-7439-b77e-ca274ebf402b",
  type: "page-type/world-skill",
  slug: "storm-of-stabs",
  title: "Storm of Stabs",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
