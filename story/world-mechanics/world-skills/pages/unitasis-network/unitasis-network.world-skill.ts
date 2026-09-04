import type { WorldSkill } from "../../world-skill.page-type.ts"

export const unitasisNetwork = {
  id: "01a0657d-031f-708f-b1a5-22beac1287f3",
  pageTypeSlug: "world-skill",
  slug: "unitasis-network",
  title: "Unitasis Network",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["unitasis-shared-skill-flawless-shot"],
  references: "jsonl",
} as const satisfies WorldSkill
