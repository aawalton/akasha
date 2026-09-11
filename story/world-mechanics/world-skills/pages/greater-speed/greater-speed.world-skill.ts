import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greaterSpeed = {
  id: "01a06575-9817-7145-b54a-2ab7673b78c6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "greater-speed",
  title: "Greater Speed",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
