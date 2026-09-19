import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dwarvenDefenceGraniteFormation = {
  id: "01a06575-9806-7a07-be82-06f678bc016a",
  type: "page-type/world-skill",
  slug: "dwarven-defence-granite-formation",
  title: "Dwarven Defence: Granite Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
