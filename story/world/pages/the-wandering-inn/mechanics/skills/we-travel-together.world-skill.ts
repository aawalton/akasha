import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const weTravelTogether = {
  id: "01a0657d-032d-7a65-a7cd-92adc1c5a17a",
  type: "page-type/world-skill",
  slug: "we-travel-together",
  title: "We Travel Together",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
