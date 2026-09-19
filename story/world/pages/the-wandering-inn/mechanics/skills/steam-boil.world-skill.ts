import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const steamBoil = {
  id: "01a0657d-02fa-77ad-a06a-8a9e852925d5",
  type: "page-type/world-skill",
  slug: "steam-boil",
  title: "Steam Boil",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
