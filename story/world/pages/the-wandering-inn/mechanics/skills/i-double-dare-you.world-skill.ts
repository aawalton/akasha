import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iDoubleDareYou = {
  id: "01a06575-981b-74bb-a0dd-fbd4369f143c",
  type: "page-type/world-skill",
  slug: "i-double-dare-you",
  title: "I Double Dare You",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
