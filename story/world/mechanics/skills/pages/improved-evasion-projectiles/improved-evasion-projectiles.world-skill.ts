import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const improvedEvasionProjectiles = {
  id: "01a06575-981e-78d0-9c6d-aff481bc2e9e",
  type: "page-type/world-skill",
  slug: "improved-evasion-projectiles",
  title: "Improved Evasion: Projectiles",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
