import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const enduringTools = {
  id: "01a06575-9808-7385-93f9-f1962a03501a",
  type: "page-type/world-skill",
  slug: "enduring-tools",
  title: "Enduring Tools",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
