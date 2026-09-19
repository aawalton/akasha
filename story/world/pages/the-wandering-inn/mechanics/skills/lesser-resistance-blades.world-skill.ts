import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserResistanceBlades = {
  id: "01a06575-9823-768e-8558-129446e4b891",
  type: "page-type/world-skill",
  slug: "lesser-resistance-blades",
  title: "Lesser Resistance (Blades)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
