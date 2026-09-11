import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const createAutomagic = {
  id: "01a06575-97fe-7fc4-a4c2-a1b09828e5c2",
  type: "world-skill",
  slug: "create-automagic",
  title: "Create Automagic",
  world: "the-wandering-inn",
} as const satisfies WorldSkill
