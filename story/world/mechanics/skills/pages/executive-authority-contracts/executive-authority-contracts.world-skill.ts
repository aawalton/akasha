import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const executiveAuthorityContracts = {
  id: "01a06575-9809-7d7b-ac2d-907b8b5c18c0",
  type: "page-type/world-skill",
  slug: "executive-authority-contracts",
  title: "Executive Authority: Contracts",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
