import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const alterContractTemporary = {
  id: "01a06575-97eb-73cd-a2e7-1fbfe25ee32e",
  type: "page-type/world-skill",
  slug: "alter-contract-temporary",
  title: "Alter Contract (Temporary)",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
