import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const divineIntuition = {
  id: "01a06575-9804-7a9c-8d5f-f8a98fbe45d6",
  type: "world-skill",
  slug: "divine-intuition",
  title: "Divine Intuition",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
