import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innPartialReconstruction = {
  id: "01a06575-981f-7fed-a710-7ffe36be9bfc",
  type: "page-type/world-skill",
  slug: "inn-partial-reconstruction",
  title: "Inn: Partial Reconstruction",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
