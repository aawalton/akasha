import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const preparedBattlegroundOneHour = {
  id: "01a0657d-0296-7fb9-8944-b7feb5d3f24e",
  type: "page-type/world-skill",
  slug: "prepared-battleground-one-hour",
  title: "Prepared Battleground: One Hour",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
