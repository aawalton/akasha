import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const greaterIllusionDoor = {
  id: "01a06575-9817-7971-9b63-73f2332d4d43",
  type: "page-type/world-skill",
  slug: "greater-illusion-door",
  title: "Greater Illusion (Door)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
