import type { WorldSkill } from "../../world-skill.page-type.ts"

export const darkAura = {
  id: "01a06575-9801-7272-9cd8-a040c69949e1",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "dark-aura",
  title: "Dark Aura",
  world: "the-wandering-inn",
  evolvesToSlugs: ["aura-of-midnight"],
} as const satisfies WorldSkill
