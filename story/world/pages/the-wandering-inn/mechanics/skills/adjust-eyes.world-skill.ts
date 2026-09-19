import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const adjustEyes = {
  id: "01a06575-97e9-7632-a7f6-947aab38b665",
  type: "page-type/world-skill",
  slug: "adjust-eyes",
  title: "Adjust Eyes",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
