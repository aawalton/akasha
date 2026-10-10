import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const rhia = {
  id: "01a126b0-c3c5-7000-b116-d3288b3d9fe7",
  type: "page-type/seat",
  slug: "rhia",
  persona: "persona/rhia",
  assignmentSlug: "initiative/rhia-twi-analysis-book",
  role: "role/definer",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "01d84cc2-9d31-4c8c-a339-21955d57885d",
  createdAt: "2026-10-10T16:41:21.583Z",
  updatedAt: "2026-10-10T16:42:42.767Z",
} as const satisfies Seat
