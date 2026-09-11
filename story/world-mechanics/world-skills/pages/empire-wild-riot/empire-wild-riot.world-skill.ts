import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const empireWildRiot = {
  id: "01a06575-9807-7236-9e57-6e107ec39b38",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "empire-wild-riot",
  title: "Empire: Wild Riot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
