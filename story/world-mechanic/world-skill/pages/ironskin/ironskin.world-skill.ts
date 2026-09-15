import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const ironskin = {
  id: "01a06575-9820-73b5-84c0-81ce91b1cad3",
  type: "world-skill",
  slug: "ironskin",
  title: "Ironskin",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
