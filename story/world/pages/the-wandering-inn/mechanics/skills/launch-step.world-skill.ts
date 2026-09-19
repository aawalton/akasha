import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const launchStep = {
  id: "01a06575-9822-79ef-b969-de78a3b2e42c",
  type: "page-type/world-skill",
  slug: "launch-step",
  title: "Launch Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
