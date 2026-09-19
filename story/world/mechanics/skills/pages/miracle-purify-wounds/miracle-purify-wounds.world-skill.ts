import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const miraclePurifyWounds = {
  id: "01a0657d-026d-7616-994c-41a778535092",
  type: "page-type/world-skill",
  slug: "miracle-purify-wounds",
  title: "Miracle: Purify Wounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
