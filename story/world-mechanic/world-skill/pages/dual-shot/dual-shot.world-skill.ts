import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const dualShot = {
  id: "01a06575-9806-7288-8e59-cde86dd44bb2",
  type: "world-skill",
  slug: "dual-shot",
  title: "Dual Shot",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
