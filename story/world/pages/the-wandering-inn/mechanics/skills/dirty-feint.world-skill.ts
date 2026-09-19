import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dirtyFeint = {
  id: "01a06575-9803-7884-9314-8af902b6283b",
  type: "page-type/world-skill",
  slug: "dirty-feint",
  title: "Dirty Feint",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
