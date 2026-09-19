import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const darkAura = {
  id: "01a06575-9801-7272-9cd8-a040c69949e1",
  type: "page-type/world-skill",
  slug: "dark-aura",
  title: "Dark Aura",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["aura-of-midnight"],
} as const satisfies WorldSkill
