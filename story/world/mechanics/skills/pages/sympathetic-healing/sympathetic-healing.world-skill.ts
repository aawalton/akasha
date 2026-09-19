import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sympatheticHealing = {
  id: "01a0657d-0307-70de-90b1-737640e5524a",
  type: "page-type/world-skill",
  slug: "sympathetic-healing",
  title: "Sympathetic Healing",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
