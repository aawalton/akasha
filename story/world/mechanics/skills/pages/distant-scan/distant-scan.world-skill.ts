import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const distantScan = {
  id: "01a06575-9804-7e8b-8769-b658531a1c9e",
  type: "page-type/world-skill",
  slug: "distant-scan",
  title: "Distant Scan",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
