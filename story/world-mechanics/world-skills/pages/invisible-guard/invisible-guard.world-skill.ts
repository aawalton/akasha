import type { WorldSkill } from "akasha/story/world-mechanics/world-skills/world-skill.page-type.types.ts"

export const invisibleGuard = {
  id: "01a06575-9820-7067-946e-85ea113051a8",
  type: "world-skill",
  slug: "invisible-guard",
  title: "Invisible Guard",
  world: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
