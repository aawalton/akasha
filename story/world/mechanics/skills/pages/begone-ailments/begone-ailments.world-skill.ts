import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const begoneAilments = {
  id: "01a06575-97f4-72c5-b8fd-ca09a2f5a3cb",
  type: "page-type/world-skill",
  slug: "begone-ailments",
  title: "Begone, Ailments",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
