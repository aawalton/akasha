import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lesserStamina = {
  id: "01a06575-9823-734d-aba0-eea21f8dd7a5",
  type: "page-type/world-skill",
  slug: "lesser-stamina",
  title: "Lesser Stamina",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
