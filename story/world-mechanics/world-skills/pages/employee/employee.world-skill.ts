import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const employee = {
  id: "01a06575-9808-75ba-a7f0-0766ed986db4",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "employee",
  title: "Employee",
  world: "the-wandering-inn",
} as const satisfies WorldSkill
