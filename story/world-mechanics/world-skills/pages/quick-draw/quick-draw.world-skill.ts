import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const quickDraw = {
  id: "01a0657d-029b-76c7-ac6c-7b3b18385644",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "quick-draw",
  title: "Quick Draw",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
