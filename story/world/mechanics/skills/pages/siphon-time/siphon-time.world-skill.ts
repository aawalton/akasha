import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const siphonTime = {
  id: "01a0657d-02c5-7add-abe7-d886121480e3",
  type: "page-type/world-skill",
  slug: "siphon-time",
  title: "Siphon Time",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
