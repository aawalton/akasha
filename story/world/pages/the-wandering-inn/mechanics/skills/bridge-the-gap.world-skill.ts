import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const bridgeTheGap = {
  id: "01a06575-97f9-7e5d-8bcd-5139ff23695c",
  type: "page-type/world-skill",
  slug: "bridge-the-gap",
  title: "Bridge the Gap",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
