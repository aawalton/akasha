import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bodyRedirection = {
  id: "01a06575-97f7-7531-8873-dd15bf974d4a",
  type: "page-type/world-skill",
  slug: "body-redirection",
  title: "Body: Redirection",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
