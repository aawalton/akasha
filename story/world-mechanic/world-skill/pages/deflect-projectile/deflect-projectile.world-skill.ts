import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const deflectProjectile = {
  id: "01a06575-9802-7ec5-95d8-bbe46241292c",
  type: "world-skill",
  slug: "deflect-projectile",
  title: "Deflect Projectile",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
