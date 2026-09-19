import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const catSEvasion = {
  id: "01a06575-97fa-731b-a205-9fd30cfd5da8",
  type: "page-type/world-skill",
  slug: "cat-s-evasion",
  title: "Cat’s Evasion",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
