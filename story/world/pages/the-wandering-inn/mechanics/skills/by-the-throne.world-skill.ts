import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const byTheThrone = {
  id: "01a06575-97f9-7283-94b9-69147d742ceb",
  type: "page-type/world-skill",
  slug: "by-the-throne",
  title: "By the Throne",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
