import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dizzyingRebuke = {
  id: "01a06575-9804-7813-b34e-cb7b30b9b43e",
  type: "world-skill",
  slug: "dizzying-rebuke",
  title: "Dizzying Rebuke",
  world: "the-wandering-inn",
  evolvesToSlugs: ["hexer-s-rebuke"],
  references: "jsonl",
} as const satisfies WorldSkill
