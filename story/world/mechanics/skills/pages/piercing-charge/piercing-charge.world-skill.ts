import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const piercingCharge = {
  id: "01a0657d-0294-7d72-bdf3-bb8a88031aa8",
  type: "page-type/world-skill",
  slug: "piercing-charge",
  title: "Piercing Charge",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
