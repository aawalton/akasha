import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const deftStrike = {
  id: "01a06575-9802-7f66-b9b7-a788f271e277",
  type: "page-type/world-skill",
  slug: "deft-strike",
  title: "Deft Strike",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
