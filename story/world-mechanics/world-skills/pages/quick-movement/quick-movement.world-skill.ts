import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickMovement = {
  id: "01a0657d-029b-76e1-84e2-954ca4557c0f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "quick-movement",
  title: "Quick Movement",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
