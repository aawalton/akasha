import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const breakFall = {
  id: "01a06575-97f8-7bdc-a832-ceefb5aeeab9",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "break-fall",
  title: "Break Fall",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
