import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const viperStrike = {
  id: "01a0657d-0320-743d-b44c-c612d0c4e8fb",
  type: "page-type/world-skill",
  slug: "viper-strike",
  title: "Viper Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
