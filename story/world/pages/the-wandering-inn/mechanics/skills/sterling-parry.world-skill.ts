import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sterlingParry = {
  id: "01a0657d-02fa-7427-967a-8adc46c5c648",
  type: "page-type/world-skill",
  slug: "sterling-parry",
  title: "Sterling Parry",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
