import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const kitchenPreventSpills = {
  id: "01a06575-9821-7592-9af5-cb3220ebfb5b",
  type: "world-skill",
  slug: "kitchen-prevent-spills",
  title: "Kitchen: Prevent Spills",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
