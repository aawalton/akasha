import type { Seat } from "akasha/agent/seat/seat.page-type.types.ts"

export const aura = {
  id: "01a0a694-170d-7000-bd6a-fd722d217073",
  type: "page-type/seat",
  slug: "aura",
  persona: "persona/aura",
  assignmentSlug: "domain/design-game",
  role: "role/definer",
  person: "person/alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
  claudeCodeSessionUuid: "51cbffae-cb16-4968-b3f6-be55b3ddcb73",
} as const satisfies Seat
