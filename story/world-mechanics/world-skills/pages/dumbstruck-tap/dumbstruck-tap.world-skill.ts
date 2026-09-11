import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const dumbstruckTap = {
  id: "01a06575-9806-7572-8b9a-13f339d8d38f",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "dumbstruck-tap",
  title: "Dumbstruck Tap",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
