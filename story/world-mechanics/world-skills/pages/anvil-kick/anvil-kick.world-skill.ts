import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const anvilKick = {
  id: "01a06575-97eb-7d13-8d56-f5b536a022b4",
  type: "world-skill",
  slug: "anvil-kick",
  title: "Anvil Kick",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
