import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const kamehamehaPunch = {
  id: "01a06575-9821-7c85-b14a-588c510c9177",
  type: "page-type/world-skill",
  slug: "kamehameha-punch",
  title: "Kamehameha Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
