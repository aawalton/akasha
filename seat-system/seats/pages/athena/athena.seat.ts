import type { Seat } from "akasha/seat-system/seats/seat.page-type.types.ts"

export const athena = {
  id: "01a090bf-384d-7000-a429-e00697781e56",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "athena",
  persona: "athena",
  assignmentSlug: "initiative/athena-commands-cleanup",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "55ca2136-2121-4638-a685-fe96396a2e20",
} as const satisfies Seat
