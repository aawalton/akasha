import type { WorldSkill } from "../../world-skill.page-type.ts"

export const quickStep = {
  id: "01a0657d-029b-7c42-8cb2-19a961687a1a",
  pageTypeSlug: "world-skill",
  slug: "quick-step",
  title: "Quick Step",
  worldSlug: "the-wandering-inn",
  evolvesToSlugs: ["flash-step"],
  references: "jsonl",
} as const satisfies WorldSkill
