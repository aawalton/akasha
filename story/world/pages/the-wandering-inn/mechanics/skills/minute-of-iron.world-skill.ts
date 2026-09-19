import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const minuteOfIron = {
  id: "01a0657d-026c-789a-9511-d07a8b2bde70",
  type: "page-type/world-skill",
  slug: "minute-of-iron",
  title: "Minute of Iron",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
