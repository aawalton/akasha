import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const perfectDispel = {
  id: "01a0657d-028f-746b-8434-f56a175cebe1",
  type: "page-type/world-skill",
  slug: "perfect-dispel",
  title: "Perfect Dispel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
