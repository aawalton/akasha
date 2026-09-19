import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doorFourfoldReinforcement = {
  id: "01a06575-9804-745f-ab7e-adfc793e14e1",
  type: "page-type/world-skill",
  slug: "door-fourfold-reinforcement",
  title: "Door: Fourfold Reinforcement",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
