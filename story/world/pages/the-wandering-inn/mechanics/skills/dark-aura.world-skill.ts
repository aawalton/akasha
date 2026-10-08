import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const darkAura = {
  id: "01a06575-9801-7272-9cd8-a040c69949e1",
  type: "page-type/world-skill",
  slug: "dark-aura",
  title: "Dark Aura",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["world-skill/aura-of-midnight"],
  createdAt: "2026-09-03T04:10:00.577Z",
  updatedAt: "2026-09-22T18:28:27.000Z",
} as const satisfies WorldSkill
