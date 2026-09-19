import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const dualBlow = {
  id: "01a06575-9806-7add-a340-fb7409b5fa13",
  type: "page-type/world-skill",
  slug: "dual-blow",
  title: "Dual Blow",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
