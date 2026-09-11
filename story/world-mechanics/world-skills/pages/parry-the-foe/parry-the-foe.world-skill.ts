import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const parryTheFoe = {
  id: "01a0657d-0286-7828-ab03-322ab1a2ebe7",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "parry-the-foe",
  title: "Parry the Foe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
