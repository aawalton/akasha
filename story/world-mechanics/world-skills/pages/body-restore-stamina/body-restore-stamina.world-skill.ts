import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const bodyRestoreStamina = {
  id: "01a06575-97f7-78b2-b014-1deb4ee702fc",
  pageTypeSlug: "world-skill",
  type: "world-skill",
  slug: "body-restore-stamina",
  title: "Body: Restore Stamina",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
