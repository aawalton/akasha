import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const empireWildRiot = {
  id: "01a06575-9807-7236-9e57-6e107ec39b38",
  type: "page-type/world-skill",
  slug: "empire-wild-riot",
  title: "Empire: Wild Riot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
