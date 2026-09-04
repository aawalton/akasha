import type { WorldSkill } from "../../world-skill.page-type.ts"

export const byAppointmentOnly = {
  id: "01a06575-97f9-7c5d-bfb9-50b148f80bca",
  pageTypeSlug: "world-skill",
  slug: "by-appointment-only",
  title: "By Appointment Only",
  worldSlug: "the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSkill
