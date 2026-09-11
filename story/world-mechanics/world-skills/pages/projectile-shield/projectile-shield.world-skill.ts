import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const projectileShield = {
  id: "01a0657d-0297-7b07-9417-f14e24b4b83a",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "projectile-shield",
  title: "Projectile Shield",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
