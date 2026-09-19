import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const iMProbablyAllowedInHere = {
  id: "01a06575-981c-7aa7-b095-ce451684c0fa",
  type: "page-type/world-skill",
  slug: "i-m-probably-allowed-in-here",
  title: "I’m (Probably) Allowed in Here",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
