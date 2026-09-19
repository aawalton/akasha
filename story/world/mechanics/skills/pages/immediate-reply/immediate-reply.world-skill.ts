import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const immediateReply = {
  id: "01a06575-981c-7cf9-ab40-b437c5a83c62",
  type: "page-type/world-skill",
  slug: "immediate-reply",
  title: "Immediate Reply",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
