import type { Seat } from "../seat.page-type.ts"

export const sophia = {
  id: "01a087b8-6af2-7000-ba28-c17d38bd4394",
  pageTypeSlug: "seat",
  slug: "sophia",
  persona: "sophia",
  assignmentSlug: "workspace-package/persona",
  role: "persona-craft",
  person: "alan",
  startMode: "interactive",
  onCall: false,
  registrationAccount: "aawalton",
} as const satisfies Seat
