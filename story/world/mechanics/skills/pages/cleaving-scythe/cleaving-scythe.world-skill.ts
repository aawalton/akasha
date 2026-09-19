import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const cleavingScythe = {
  id: "01a06575-97fb-76f0-8dcc-54634af5147b",
  type: "page-type/world-skill",
  slug: "cleaving-scythe",
  title: "Cleaving Scythe",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
