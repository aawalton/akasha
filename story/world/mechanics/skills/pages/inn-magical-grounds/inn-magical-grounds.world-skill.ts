import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const innMagicalGrounds = {
  id: "01a06575-981f-744a-9205-21e33ef853b0",
  type: "page-type/world-skill",
  slug: "inn-magical-grounds",
  title: "Inn: Magical Grounds",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
