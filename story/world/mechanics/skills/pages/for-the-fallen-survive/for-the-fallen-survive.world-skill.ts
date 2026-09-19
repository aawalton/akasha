import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const forTheFallenSurvive = {
  id: "01a06575-980f-7435-823c-1b97b1848ab3",
  type: "page-type/world-skill",
  slug: "for-the-fallen-survive",
  title: "For the Fallen, Survive",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
