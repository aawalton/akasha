import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const inflictCurseSelf = {
  id: "01a06575-981e-713f-8f59-964285a84934",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "inflict-curse-self",
  title: "Inflict Curse: Self",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
