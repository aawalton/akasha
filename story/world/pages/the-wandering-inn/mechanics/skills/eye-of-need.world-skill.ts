import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const eyeOfNeed = {
  id: "01a06575-980b-7f29-bc5e-2896026624d5",
  type: "page-type/world-skill",
  slug: "eye-of-need",
  title: "Eye of Need",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
