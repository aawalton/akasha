import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const guaranteedShot = {
  id: "01a06575-9817-7715-9cc2-ab107308dbdc",
  type: "world-skill",
  slug: "guaranteed-shot",
  title: "Guaranteed Shot",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
