import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const officerSSecondChance = {
  id: "01a0657d-027b-74b2-b5bb-bf8c681b84dd",
  type: "page-type/world-skill",
  slug: "officer-s-second-chance",
  title: "Officer’s Second Chance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
