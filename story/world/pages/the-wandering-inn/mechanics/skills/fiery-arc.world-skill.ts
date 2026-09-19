import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fieryArc = {
  id: "01a06575-980c-730c-be3f-14d9270a69a6",
  type: "page-type/world-skill",
  slug: "fiery-arc",
  title: "Fiery Arc",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
