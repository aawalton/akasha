import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const freeUpgradePlumbing = {
  id: "01a06575-9810-72fd-9774-a14fbad3ca75",
  type: "page-type/world-skill",
  slug: "free-upgrade-plumbing",
  title: "Free Upgrade (Plumbing)",
  world: "world/the-wandering-inn",
} as const satisfies WorldSkill
