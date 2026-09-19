import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const canticleOfMending = {
  id: "01a06575-97fa-7cd7-883f-0cc5ab27ff5c",
  type: "page-type/world-skill",
  slug: "canticle-of-mending",
  title: "Canticle of Mending",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
