import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const invisibleToDecency = {
  id: "01a06575-9820-789c-94e3-3645c76cd96d",
  type: "page-type/world-skill",
  slug: "invisible-to-decency",
  title: "Invisible to Decency",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
