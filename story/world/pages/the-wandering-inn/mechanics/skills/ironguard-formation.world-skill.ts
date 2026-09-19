import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const ironguardFormation = {
  id: "01a06575-9820-7462-9d85-332d1eb1a629",
  type: "page-type/world-skill",
  slug: "ironguard-formation",
  title: "Ironguard Formation",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
