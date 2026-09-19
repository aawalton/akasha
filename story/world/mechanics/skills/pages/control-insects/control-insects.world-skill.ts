import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const controlInsects = {
  id: "01a06575-97fd-7b4d-a37a-7342e4fe0c36",
  type: "page-type/world-skill",
  slug: "control-insects",
  title: "Control Insects",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
