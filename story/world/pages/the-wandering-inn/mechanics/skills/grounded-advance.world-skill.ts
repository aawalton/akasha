import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const groundedAdvance = {
  id: "01a06575-9817-7c75-82cf-455cb9c84b5b",
  type: "page-type/world-skill",
  slug: "grounded-advance",
  title: "Grounded Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
