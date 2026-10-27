import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const dalla = {
  id: "01a16fe0-759e-7000-b8cc-787a2037ab1d",
  type: "page-type/seat",
  slug: "dalla",
  persona: "persona/dalla",
  assignmentSlug: "module/change",
  role: "role/definer",
  persons: ["person/alan"],
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  claudeCodeSessionUuid: "54d1b182-89f2-412d-931a-113d868240e3",
  createdAt: "2026-10-27T20:13:58.033Z",
  updatedAt: "2026-10-27T20:13:58.033Z",
} as const satisfies Seat
