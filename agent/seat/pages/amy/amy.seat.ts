import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const amy = {
  id: "01a17e94-fb22-740a-88b6-76d5372fb10e",
  type: "page-type/seat",
  slug: "amy",
  persona: "persona/amy",
  assignmentSlug: "domain/alan-harness",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "4b73b421-385a-410d-9edd-9c75ed197402",
  createdAt: "2026-10-27T18:17:35.617Z",
  updatedAt: "2026-10-27T18:17:38.170Z",
} as const satisfies Seat
