import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const benediction = {
  id: "01a06575-97f5-78b9-a493-931e98b1637f",
  type: "page-type/world-skill",
  slug: "benediction",
  title: "Benediction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
