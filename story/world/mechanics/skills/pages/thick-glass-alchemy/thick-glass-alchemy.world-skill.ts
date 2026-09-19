import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const thickGlassAlchemy = {
  id: "01a0657d-0313-737f-9328-cab4ccbc6709",
  type: "page-type/world-skill",
  slug: "thick-glass-alchemy",
  title: "Thick Glass (Alchemy)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
