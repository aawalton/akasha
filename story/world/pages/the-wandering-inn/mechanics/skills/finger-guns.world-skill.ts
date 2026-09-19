import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fingerGuns = {
  id: "01a06575-980c-7478-9e91-5fa20e90baf0",
  type: "page-type/world-skill",
  slug: "finger-guns",
  title: "Finger Guns",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
