import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const detectAcid = {
  id: "01a06575-9803-796f-ba10-34bafebba4f7",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "detect-acid",
  title: "Detect Acid",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
