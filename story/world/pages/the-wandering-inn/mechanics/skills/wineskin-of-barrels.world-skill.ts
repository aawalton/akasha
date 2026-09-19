import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const wineskinOfBarrels = {
  id: "01a0657d-0336-709c-b792-b7c00a32d17d",
  type: "page-type/world-skill",
  slug: "wineskin-of-barrels",
  title: "Wineskin of Barrels",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
