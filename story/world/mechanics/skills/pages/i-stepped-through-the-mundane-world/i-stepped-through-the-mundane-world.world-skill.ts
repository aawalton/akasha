import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iSteppedThroughTheMundaneWorld = {
  id: "01a06575-981c-7cbc-a22e-7ddbfb67eb2e",
  type: "page-type/world-skill",
  slug: "i-stepped-through-the-mundane-world",
  title: "I Stepped Through the Mundane World",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
