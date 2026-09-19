import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const distractingFlash = {
  id: "01a06575-9804-7444-8ba5-420d83680894",
  type: "page-type/world-skill",
  slug: "distracting-flash",
  title: "Distracting Flash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
