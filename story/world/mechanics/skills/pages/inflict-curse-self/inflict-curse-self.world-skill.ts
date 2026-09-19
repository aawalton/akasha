import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const inflictCurseSelf = {
  id: "01a06575-981e-713f-8f59-964285a84934",
  type: "page-type/world-skill",
  slug: "inflict-curse-self",
  title: "Inflict Curse: Self",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
