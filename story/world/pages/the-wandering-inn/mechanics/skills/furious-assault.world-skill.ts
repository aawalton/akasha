import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const furiousAssault = {
  id: "01a06575-9811-73f2-9b7e-bb649e4194c3",
  type: "page-type/world-skill",
  slug: "furious-assault",
  title: "Furious Assault",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
