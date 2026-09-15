import type { WorldSkill } from "akasha/story/world-mechanic/world-skill/world-skill.page-type.types.ts"

export const streetLockdown = {
  id: "01a0657d-02fe-7f24-b62f-1ac96ab097d8",
  type: "world-skill",
  slug: "street-lockdown",
  title: "Street Lockdown",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
