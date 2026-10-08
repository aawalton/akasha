import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const nova = {
  id: "01a11cde-7e04-7000-b677-7a4266a350f5",
  type: "page-type/seat",
  slug: "nova",
  persona: "persona/nova",
  assignmentSlug: "domain/litrpg-book",
  role: "role/companion",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "26f3fe58-ec2b-4bc8-bbd5-1deae6721af6",
  createdAt: "2026-10-08T18:55:06.236Z",
  updatedAt: "2026-10-08T18:55:08.985Z",
} as const satisfies Seat
