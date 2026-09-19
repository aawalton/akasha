import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const mendCreation = {
  id: "01a0657d-024c-7608-9b49-bef1fe7c69ed",
  type: "page-type/world-skill",
  slug: "mend-creation",
  title: "Mend Creation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
