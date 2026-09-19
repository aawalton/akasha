import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const auraOfTheEmperor = {
  id: "01a06575-97f0-7cb6-8f6b-328ccede0b91",
  type: "page-type/world-skill",
  slug: "aura-of-the-emperor",
  title: "Aura of the Emperor",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
