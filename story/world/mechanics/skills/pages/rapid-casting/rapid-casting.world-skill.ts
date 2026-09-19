import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const rapidCasting = {
  id: "01a0657d-02a4-7387-81fc-49f0554968bf",
  type: "page-type/world-skill",
  slug: "rapid-casting",
  title: "Rapid Casting",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
