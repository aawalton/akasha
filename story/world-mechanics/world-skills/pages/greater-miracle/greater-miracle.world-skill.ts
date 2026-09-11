import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const greaterMiracle = {
  id: "01a06575-9817-7a5a-98be-4a9ca2971fa8",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "greater-miracle",
  title: "Greater Miracle",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
