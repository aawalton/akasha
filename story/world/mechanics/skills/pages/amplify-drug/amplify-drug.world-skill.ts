import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const amplifyDrug = {
  id: "01a06575-97eb-731a-9e07-3bfd8c372f41",
  type: "page-type/world-skill",
  slug: "amplify-drug",
  title: "Amplify Drug",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
