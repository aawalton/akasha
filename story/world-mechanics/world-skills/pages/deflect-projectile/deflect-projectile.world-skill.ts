import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const deflectProjectile = {
  id: "01a06575-9802-7ec5-95d8-bbe46241292c",
  type: "world-skill",
  slug: "deflect-projectile",
  title: "Deflect Projectile",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
