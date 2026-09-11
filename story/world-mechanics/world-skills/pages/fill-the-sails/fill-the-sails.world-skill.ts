import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const fillTheSails = {
  id: "01a06575-980c-7114-ad2b-693af93c10a5",
  type: "world-skill",
  slug: "fill-the-sails",
  title: "Fill the Sails",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
