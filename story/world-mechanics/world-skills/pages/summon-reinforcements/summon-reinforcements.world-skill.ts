import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const summonReinforcements = {
  id: "01a0657d-02fe-74e5-bb07-d3b77282621e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "summon-reinforcements",
  title: "Summon Reinforcements",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
