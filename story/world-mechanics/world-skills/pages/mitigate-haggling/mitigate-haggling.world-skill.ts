import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const mitigateHaggling = {
  id: "01a0657d-026f-7f2e-b278-8c76baa1172b",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "mitigate-haggling",
  title: "Mitigate Haggling",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
