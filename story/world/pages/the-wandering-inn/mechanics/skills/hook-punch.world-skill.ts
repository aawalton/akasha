import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const hookPunch = {
  id: "01a06575-981a-7f2f-a1d8-48a9dac49008",
  type: "page-type/world-skill",
  slug: "hook-punch",
  title: "Hook Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
