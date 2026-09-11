import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const stopProjectile = {
  id: "01a0657d-02fa-76d1-966c-2378857b1576",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "stop-projectile",
  title: "Stop Projectile",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
