import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deflectProjectileAlly = {
  id: "01a06575-9802-70f6-9ec5-0fa447f839fe",
  type: "page-type/world-skill",
  slug: "deflect-projectile-ally",
  title: "Deflect Projectile (Ally)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
