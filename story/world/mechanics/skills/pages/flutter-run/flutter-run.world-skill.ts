import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const flutterRun = {
  id: "01a06575-980f-70e3-8166-741d3921e66c",
  type: "page-type/world-skill",
  slug: "flutter-run",
  title: "Flutter Run",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
