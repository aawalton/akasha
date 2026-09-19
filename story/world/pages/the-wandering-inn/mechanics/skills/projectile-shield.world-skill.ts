import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const projectileShield = {
  id: "01a0657d-0297-7b07-9417-f14e24b4b83a",
  type: "page-type/world-skill",
  slug: "projectile-shield",
  title: "Projectile Shield",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
