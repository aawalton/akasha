import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const boons = {
  id: "01a06575-97f8-79e6-b149-e225a651f867",
  type: "page-type/world-skill",
  slug: "boons",
  title: "Boons",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
