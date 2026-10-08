import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11cde-7e04-7000-b677-7a4266a350f5",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/terminus",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "26f3fe58-ec2b-4bc8-bbd5-1deae6721af6",
  createdAt: "2026-10-08T18:55:06.236Z",
  updatedAt: "2026-10-08T18:59:07.843Z",
} as const satisfies Seat
