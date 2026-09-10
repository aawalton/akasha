import type { Seat } from "../seat.page-type.types.ts"

export const amy = {
  id: "01a087b5-1ca3-7000-bf5c-16aae1620c39",
  pageTypeSlug: "seat",
  type: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "initiative/amy-harness-improvements",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "e484c043-c2cb-44de-81fb-4f768d02839f",
} as const satisfies Seat
