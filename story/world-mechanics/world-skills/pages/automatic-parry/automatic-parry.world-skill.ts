import type { WorldSkill } from "../../world-skill.page-type.ts"

export const automaticParry = {
  id: "01a06575-97f0-7b66-b3e4-9f12a2a43b2e",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "automatic-parry",
  title: "Automatic Parry",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
