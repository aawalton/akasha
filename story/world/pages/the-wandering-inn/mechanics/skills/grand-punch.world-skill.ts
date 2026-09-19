import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const grandPunch = {
  id: "01a06575-9816-7a68-8233-6f12742f68e9",
  type: "page-type/world-skill",
  slug: "grand-punch",
  title: "Grand Punch",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
