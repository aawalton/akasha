import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const eyeOfTheClient = {
  id: "01a06575-980b-78ed-8a00-a42a775d035f",
  type: "world-skill",
  slug: "eye-of-the-client",
  title: "Eye of the Client",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
