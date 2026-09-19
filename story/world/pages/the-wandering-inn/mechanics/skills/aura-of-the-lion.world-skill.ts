import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheLion = {
  id: "01a06575-97f0-7774-a227-9dac71b8fe8c",
  type: "page-type/world-skill",
  slug: "aura-of-the-lion",
  title: "Aura of the Lion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
