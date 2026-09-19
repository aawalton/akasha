import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const lungingStrike = {
  id: "01a0657d-0241-7b01-8d23-dc6608b6c42a",
  type: "page-type/world-skill",
  slug: "lunging-strike",
  title: "Lunging Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
