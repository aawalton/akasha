import type { Seat } from "../seat.page-type.ts"

export const olwen = {
  id: "01a06d55-e94a-7000-924e-553f1e979085",
  pageTypeSlug: "seat",
  slug: "olwen",
  personaSlug: "olwen",
  assignmentSlug: "workspace-package/design-system",
  roleSlug: "definer",
  personSlug: "alan",
  startMode: "interactive",
  onCall: true,
  registrationAccount: "aawalton",
} as const satisfies Seat
