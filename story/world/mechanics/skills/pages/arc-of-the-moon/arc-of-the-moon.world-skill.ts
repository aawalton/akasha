import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const arcOfTheMoon = {
  id: "01a06575-97ec-7181-9d42-563ff0bfd7ae",
  type: "page-type/world-skill",
  slug: "arc-of-the-moon",
  title: "Arc of the Moon",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
