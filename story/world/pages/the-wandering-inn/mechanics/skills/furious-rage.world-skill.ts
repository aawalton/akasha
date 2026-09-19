import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const furiousRage = {
  id: "01a06575-9811-7232-be56-733455c7e4bb",
  type: "page-type/world-skill",
  slug: "furious-rage",
  title: "Furious Rage",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
