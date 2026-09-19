import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const controlledReleaseHorizontalSpray = {
  id: "01a06575-97fd-720f-9829-b2e533c916e8",
  type: "page-type/world-skill",
  slug: "controlled-release-horizontal-spray",
  title: "Controlled Release: Horizontal Spray",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
