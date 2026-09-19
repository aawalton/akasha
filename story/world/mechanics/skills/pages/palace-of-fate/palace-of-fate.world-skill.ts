import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const palaceOfFate = {
  id: "01a0657d-027f-7bda-9720-e14785803eb7",
  type: "page-type/world-skill",
  slug: "palace-of-fate",
  title: "Palace of Fate",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
