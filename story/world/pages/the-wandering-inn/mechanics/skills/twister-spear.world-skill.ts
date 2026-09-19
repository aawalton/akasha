import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const twisterSpear = {
  id: "01a0657d-0317-7d75-a353-6ef7f8bb4610",
  type: "page-type/world-skill",
  slug: "twister-spear",
  title: "Twister Spear",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
