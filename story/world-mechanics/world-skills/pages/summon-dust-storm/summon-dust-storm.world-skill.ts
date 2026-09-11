import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const summonDustStorm = {
  id: "01a0657d-02fe-787c-a8a9-22990f56d325",
  type: "world-skill",
  slug: "summon-dust-storm",
  title: "Summon Dust Storm",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
