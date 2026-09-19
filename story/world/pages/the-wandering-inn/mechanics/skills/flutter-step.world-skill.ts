import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flutterStep = {
  id: "01a06575-980f-7bbb-984e-9e72974dd099",
  type: "page-type/world-skill",
  slug: "flutter-step",
  title: "Flutter Step",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
