import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const antimagicBlade = {
  id: "01a06575-97eb-7c75-adb0-b7ce92bc8de8",
  type: "page-type/world-skill",
  slug: "antimagic-blade",
  title: "Antimagic Blade",
  world: "world/the-wandering-inn",
  appearanceCount: 2,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.555Z",
  updatedAt: "2026-09-22T13:31:32.000Z",
} as const satisfies WorldSkill
