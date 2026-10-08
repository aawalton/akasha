import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveStudyJournal = {
  id: "01a0e9fb-2b66-7c95-8a50-78a71094644a",
  type: "page-type/world-mechanic",
  slug: "super-supportive-study-journal",
  title: "Study journal",
  world: "world/super-supportive",
  description:
    "A student's record of independently pursuing a subject beyond what instructors require, written for classmates to read.",
  createdAt: "2026-09-28T21:45:47.110Z",
  updatedAt: "2026-09-28T21:45:51.000Z",
} as const satisfies WorldMechanic
