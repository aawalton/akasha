import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antimagicIai = {
  id: "01a06575-97eb-7640-8a9d-d410695c014a",
  type: "page-type/world-skill",
  slug: "antimagic-iai",
  title: "Antimagic Iai",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
