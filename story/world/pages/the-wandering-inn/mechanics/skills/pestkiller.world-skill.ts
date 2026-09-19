import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const pestkiller = {
  id: "01a0657d-028f-7d32-a195-3875ef777d61",
  type: "page-type/world-skill",
  slug: "pestkiller",
  title: "Pestkiller",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
