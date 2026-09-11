import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectFlaw = {
  id: "01a06575-9803-737d-9c43-17a4deb0faf5",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "detect-flaw",
  title: "Detect Flaw",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
