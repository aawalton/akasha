import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const peacefulMelody = {
  id: "01a0657d-028e-7d53-9a5e-78d1b20b71fb",
  type: "page-type/world-skill",
  slug: "peaceful-melody",
  title: "Peaceful Melody",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
