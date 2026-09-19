import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const willOfSteel = {
  id: "01a0657d-0336-71de-b5f2-a376095b2479",
  type: "page-type/world-skill",
  slug: "will-of-steel",
  title: "Will of Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
