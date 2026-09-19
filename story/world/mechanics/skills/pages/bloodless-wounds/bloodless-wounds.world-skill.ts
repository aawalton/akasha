import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bloodlessWounds = {
  id: "01a06575-97f6-7ef3-8381-28e3de923524",
  type: "page-type/world-skill",
  slug: "bloodless-wounds",
  title: "Bloodless Wounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
