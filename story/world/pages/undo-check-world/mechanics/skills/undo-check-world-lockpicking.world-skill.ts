import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const undoCheckWorldLockpicking = {
  id: "01a18309-e114-7afd-b5bc-db967ebb3b29",
  type: "page-type/world-skill",
  slug: "undo-check-world-lockpicking",
  title: "Lockpicking",
  world: "world/undo-check-world",
  description: "Opening a lock without its key.",
  createdAt: "2026-10-28T15:03:47.724Z",
  updatedAt: "2026-10-28T15:03:47.724Z",
} as const satisfies WorldSkill
