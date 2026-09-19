import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const copyMessage = {
  id: "01a06575-97fd-71dd-84c7-24af57a76728",
  type: "page-type/world-skill",
  slug: "copy-message",
  title: "Copy Message",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
