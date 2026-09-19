import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mirageCut = {
  id: "01a0657d-026f-7581-8e3a-43756c4f5947",
  type: "page-type/world-skill",
  slug: "mirage-cut",
  title: "Mirage Cut",
  world: "world/the-wandering-inn",
  evolvesFromSlugs: ["power-strike"],
  references: "jsonl",
} as const satisfies WorldSkill
