import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const clearTheField = {
  id: "01a06575-97fb-7632-9670-037015fca2dc",
  type: "page-type/world-skill",
  slug: "clear-the-field",
  title: "Clear the Field",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
