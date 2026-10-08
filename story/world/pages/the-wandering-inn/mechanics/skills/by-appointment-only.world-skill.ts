import type { WorldSkill } from "akasha/story/world/mechanics/skills/world-skill.page-type.types.ts"

export const byAppointmentOnly = {
  id: "01a06575-97f9-7c5d-bfb9-50b148f80bca",
  type: "page-type/world-skill",
  slug: "by-appointment-only",
  title: "By Appointment Only",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  references: "jsonl",
  createdAt: "2026-09-03T04:10:00.569Z",
  updatedAt: "2026-09-22T13:31:48.000Z",
} as const satisfies WorldSkill
