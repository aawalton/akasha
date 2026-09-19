import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bladeOfZethe = {
  id: "01a06575-97f5-792d-a751-759d856babe1",
  type: "page-type/world-skill",
  slug: "blade-of-zethe",
  title: "Blade of Zethe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
