import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const hailOfProjectiles = {
  id: "01a06575-9818-74a0-9355-ab71f471039d",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "hail-of-projectiles",
  title: "Hail of Projectiles",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
