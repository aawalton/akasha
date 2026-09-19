import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const sluggishAdvance = {
  id: "01a0657d-02c7-72c5-87d5-cd562d35d522",
  type: "page-type/world-skill",
  slug: "sluggish-advance",
  title: "Sluggish Advance",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
