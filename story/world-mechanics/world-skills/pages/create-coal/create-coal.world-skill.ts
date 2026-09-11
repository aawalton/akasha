import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createCoal = {
  id: "01a06575-97fe-7848-8bc9-c81ff3830b44",
  type: "world-skill",
  slug: "create-coal",
  title: "Create: Coal",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
