import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const appraisal = {
  id: "01a06575-97ec-7236-a23d-d6e64d28069d",
  type: "page-type/world-skill",
  slug: "appraisal",
  title: "Appraisal",
  world: "world/the-wandering-inn",
  aliases: ["APPRAISAL"],
  references: "jsonl",
} as const satisfies WorldSkill
