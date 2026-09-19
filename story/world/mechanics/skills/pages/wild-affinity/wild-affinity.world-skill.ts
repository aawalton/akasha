import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wildAffinity = {
  id: "01a0657d-032e-70c7-a238-309eb38e8f23",
  type: "page-type/world-skill",
  slug: "wild-affinity",
  title: "Wild Affinity",
  world: "world/the-wandering-inn",
  evolvesToSlugs: ["peace-of-the-wild"],
  references: "jsonl",
} as const satisfies WorldSkill
