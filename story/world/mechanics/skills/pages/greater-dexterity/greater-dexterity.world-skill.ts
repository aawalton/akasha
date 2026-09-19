import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterDexterity = {
  id: "01a06575-9816-736e-a722-ca6e6cb08f36",
  type: "page-type/world-skill",
  slug: "greater-dexterity",
  title: "Greater Dexterity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
