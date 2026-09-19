import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const captureImage = {
  id: "01a06575-97fa-7733-80c3-ce9d7e900c45",
  type: "page-type/world-skill",
  slug: "capture-image",
  title: "Capture Image",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
