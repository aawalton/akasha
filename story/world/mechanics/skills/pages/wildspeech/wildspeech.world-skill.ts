import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildspeech = {
  id: "01a0657d-0336-7e61-9e01-4369822e525a",
  type: "page-type/world-skill",
  slug: "wildspeech",
  title: "Wildspeech",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
