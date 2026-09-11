import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createListOfTheNeedy = {
  id: "01a06575-97fe-7a77-a2e0-4b44644f1325",
  type: "world-skill",
  slug: "create-list-of-the-needy",
  title: "Create: List of the Needy",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
