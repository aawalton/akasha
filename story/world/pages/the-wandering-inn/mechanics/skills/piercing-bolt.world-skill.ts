import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingBolt = {
  id: "01a0657d-0294-7c99-baa6-e0224797ec10",
  type: "page-type/world-skill",
  slug: "piercing-bolt",
  title: "Piercing Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
