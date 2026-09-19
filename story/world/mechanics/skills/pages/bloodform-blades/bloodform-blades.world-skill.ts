import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bloodformBlades = {
  id: "01a06575-97f6-740e-846b-efe7e393be1d",
  type: "page-type/world-skill",
  slug: "bloodform-blades",
  title: "Bloodform Blades",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
