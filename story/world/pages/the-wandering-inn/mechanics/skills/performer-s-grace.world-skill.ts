import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const performerSGrace = {
  id: "01a0657d-028f-7a56-bd39-392ec02a8ce8",
  type: "page-type/world-skill",
  slug: "performer-s-grace",
  title: "Performer’s Grace",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
