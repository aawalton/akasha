import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const doubleScreenWatching = {
  id: "01a06575-9805-76af-beee-99933d421a34",
  type: "world-skill",
  slug: "double-screen-watching",
  title: "Double Screen Watching",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
