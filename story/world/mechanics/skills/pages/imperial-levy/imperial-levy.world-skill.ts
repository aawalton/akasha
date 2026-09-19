import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const imperialLevy = {
  id: "01a06575-981d-7405-bf9b-c7ae9258c433",
  type: "page-type/world-skill",
  slug: "imperial-levy",
  title: "Imperial Levy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
