import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const cleavingScythe = {
  id: "01a06575-97fb-76f0-8dcc-54634af5147b",
  type: "world-skill",
  slug: "cleaving-scythe",
  title: "Cleaving Scythe",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
