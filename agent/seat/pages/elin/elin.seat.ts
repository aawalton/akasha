import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const elin = {
  id: "01a17479-4d90-7000-acb7-9bd3b91965d3",
  type: "page-type/seat",
  slug: "elin",
  persona: "persona/elin",
  assignmentSlug: "page-type/collection",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "3dd621b7-ede8-4744-ac14-3d19b90d0269",
  createdAt: "2026-10-25T19:11:09.931Z",
  updatedAt: "2026-10-25T19:11:13.578Z",
} as const satisfies Seat
