import type { Seat } from "../seat.page-type.ts"

export const amy = {
  id: "01a07e83-7b6c-7000-a876-5c2d08753493",
  pageTypeSlug: "seat",
  slug: "amy",
  persona: "amy",
  assignmentSlug: "initiative/amy-day-model",
  role: "definer",
  person: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "85915d43-be4a-4189-8c74-22f42838fb08",
} as const satisfies Seat
