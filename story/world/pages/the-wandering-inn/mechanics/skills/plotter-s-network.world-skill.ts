import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const plotterSNetwork = {
  id: "01a0657d-0295-7513-9351-4c5075a9088a",
  type: "page-type/world-skill",
  slug: "plotter-s-network",
  title: "Plotter’s Network",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["prepared-signal"],
  references: "jsonl",
} as const satisfies WorldSkill
