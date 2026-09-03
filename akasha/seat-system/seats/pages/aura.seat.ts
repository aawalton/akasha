import type { Seat } from "../seat.page-type.ts"

export const aura = {
  id: "01a06736-77e0-7000-aa7d-696e94d6de89",
  pageTypeSlug: "seat",
  slug: "aura",
  personaSlug: "aura",
  assignmentSlug: "domain/game-design",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
