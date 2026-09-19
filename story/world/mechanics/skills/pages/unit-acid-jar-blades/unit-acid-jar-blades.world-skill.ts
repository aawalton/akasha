import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const unitAcidJarBlades = {
  id: "01a0657d-031e-7683-a06b-7b5bf7d6406b",
  type: "page-type/world-skill",
  slug: "unit-acid-jar-blades",
  title: "Unit: Acid Jar Blades",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
