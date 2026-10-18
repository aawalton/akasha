import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const natalie = {
  id: "01a1507c-f922-7000-8cae-f5c4533a69b1",
  type: "page-type/seat",
  slug: "natalie",
  persona: "persona/natalie",
  assignmentSlug: "page-type/food-entry",
  role: "role/coach",
  person: "person/alan",
  startMode: "seat-mode/interactive",
  onCall: true,
  registrationAccount: "model-account/aawalton",
  createdAt: "2026-10-18T19:28:50.370Z",
  updatedAt: "2026-10-18T19:28:50.370Z",
} as const satisfies Seat
