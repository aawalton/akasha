import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const unitasisNetwork = {
  id: "01a0657d-031f-708f-b1a5-22beac1287f3",
  type: "world-skill",
  slug: "unitasis-network",
  title: "Unitasis Network",
  world: "the-wandering-inn",
  evolvesToSlugs: ["unitasis-shared-skill-flawless-shot"],
  references: "jsonl",
} as const satisfies WorldSkill
