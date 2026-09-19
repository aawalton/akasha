import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const doublePedaling = {
  id: "01a06575-9805-7085-bf10-fd2ec5b94c5a",
  type: "page-type/world-skill",
  slug: "double-pedaling",
  title: "Double Pedaling",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
