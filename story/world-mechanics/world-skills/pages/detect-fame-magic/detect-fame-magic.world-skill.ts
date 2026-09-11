import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectFameMagic = {
  id: "01a06575-9803-7e10-bd69-9426e209fec6",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "detect-fame-magic",
  title: "Detect Fame: Magic",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
