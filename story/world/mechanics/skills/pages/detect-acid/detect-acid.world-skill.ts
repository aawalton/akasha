import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const detectAcid = {
  id: "01a06575-9803-796f-ba10-34bafebba4f7",
  type: "page-type/world-skill",
  slug: "detect-acid",
  title: "Detect Acid",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
