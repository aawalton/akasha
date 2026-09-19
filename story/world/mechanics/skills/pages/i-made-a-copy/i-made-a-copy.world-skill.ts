import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iMadeACopy = {
  id: "01a06575-981c-75dc-a30e-6d31fed01a86",
  type: "page-type/world-skill",
  slug: "i-made-a-copy",
  title: "I Made a Copy",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
