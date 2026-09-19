import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antimagicBolt = {
  id: "01a06575-97eb-7aa5-b0ac-5e47610a645e",
  type: "page-type/world-skill",
  slug: "antimagic-bolt",
  title: "Antimagic Bolt",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
