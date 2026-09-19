import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const invisibleGuard = {
  id: "01a06575-9820-7067-946e-85ea113051a8",
  type: "page-type/world-skill",
  slug: "invisible-guard",
  title: "Invisible Guard",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
