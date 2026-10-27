import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const testWorldLockpicking = {
  id: "01a17ec5-a3e5-7f02-97ef-f441d85b8821",
  type: "page-type/world-skill",
  slug: "test-world-lockpicking",
  title: "Lockpicking",
  world: "world/test-world",
  description: "Opening a lock without its key.",
  createdAt: "2026-10-27T19:10:44.195Z",
  updatedAt: "2026-10-27T19:10:44.195Z",
} as const satisfies WorldSkill
