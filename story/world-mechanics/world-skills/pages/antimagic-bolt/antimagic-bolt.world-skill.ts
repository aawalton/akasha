import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const antimagicBolt = {
  id: "01a06575-97eb-7aa5-b0ac-5e47610a645e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "antimagic-bolt",
  title: "Antimagic Bolt",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
