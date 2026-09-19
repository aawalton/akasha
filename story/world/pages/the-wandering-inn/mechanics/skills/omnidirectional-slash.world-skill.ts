import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const omnidirectionalSlash = {
  id: "01a0657d-027c-76af-98dd-ae34d310f08c",
  type: "page-type/world-skill",
  slug: "omnidirectional-slash",
  title: "Omnidirectional Slash",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
