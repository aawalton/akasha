import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const fleshIsSteel = {
  id: "01a06575-980e-7f5d-8ed2-d920a00723b8",
  type: "page-type/world-skill",
  slug: "flesh-is-steel",
  title: "Flesh is Steel",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
