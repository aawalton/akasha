import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fitToForm = {
  id: "01a06575-980d-75e0-988a-e362205fde57",
  type: "page-type/world-skill",
  slug: "fit-to-form",
  title: "Fit to Form",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
