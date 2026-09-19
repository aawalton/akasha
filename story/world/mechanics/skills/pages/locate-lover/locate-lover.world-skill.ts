import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const locateLover = {
  id: "01a0657d-0240-78cc-b788-a879f44d497d",
  type: "page-type/world-skill",
  slug: "locate-lover",
  title: "Locate Lover",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
