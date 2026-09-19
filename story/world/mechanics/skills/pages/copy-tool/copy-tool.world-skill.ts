import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copyTool = {
  id: "01a06575-97fe-7671-ac16-c0e1b546c3a0",
  type: "page-type/world-skill",
  slug: "copy-tool",
  title: "Copy Tool",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
