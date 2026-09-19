import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const stormOfAThousandBolts = {
  id: "01a0657d-02fa-79bb-9979-81627c5d05ef",
  type: "page-type/world-skill",
  slug: "storm-of-a-thousand-bolts",
  title: "Storm of a Thousand Bolts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
