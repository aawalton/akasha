import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thousandFootSprint = {
  id: "01a0657d-0315-7f52-865f-2f97328d7521",
  type: "page-type/world-skill",
  slug: "thousand-foot-sprint",
  title: "Thousand Foot Sprint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
