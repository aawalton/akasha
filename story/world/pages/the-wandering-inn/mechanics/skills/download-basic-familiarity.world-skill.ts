import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const downloadBasicFamiliarity = {
  id: "01a06575-9805-779d-b42a-e8bc16cb01a5",
  type: "page-type/world-skill",
  slug: "download-basic-familiarity",
  title: "Download Basic Familiarity",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
