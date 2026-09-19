import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const killConfirmed = {
  id: "01a06575-9821-7a2f-9018-09c1ce3f53c4",
  type: "page-type/world-skill",
  slug: "kill-confirmed",
  title: "Kill Confirmed",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
