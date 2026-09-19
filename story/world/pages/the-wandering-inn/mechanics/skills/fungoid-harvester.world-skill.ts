import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fungoidHarvester = {
  id: "01a06575-9811-7c68-a3a5-72d19cd29620",
  type: "page-type/world-skill",
  slug: "fungoid-harvester",
  title: "Fungoid Harvester",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
