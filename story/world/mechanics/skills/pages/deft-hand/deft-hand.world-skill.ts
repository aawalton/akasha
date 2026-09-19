import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deftHand = {
  id: "01a06575-9802-7028-b26c-dff4f62a7300",
  type: "page-type/world-skill",
  slug: "deft-hand",
  title: "Deft Hand",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
