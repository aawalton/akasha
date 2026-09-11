import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const basicTelekinesis = {
  id: "01a06575-97f4-70ec-b168-5a8ec8d834ca",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "basic-telekinesis",
  title: "Basic Telekinesis",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
