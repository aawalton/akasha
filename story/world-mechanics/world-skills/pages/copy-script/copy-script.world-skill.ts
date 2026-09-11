import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const copyScript = {
  id: "01a06575-97fe-7cd0-954c-78e13583ffc7",
  type: "world-skill",
  slug: "copy-script",
  title: "Copy Script",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
