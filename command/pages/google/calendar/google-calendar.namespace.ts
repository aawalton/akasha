import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const googleCalendar = {
  id: "01a08cf6-b1c5-79c3-82d3-dbfdb11be5de",
  type: "page-type/namespace",
  slug: "google-calendar",
  definition: "the calendar Alan keeps with Google",
  parts: ["namespace/google-calendar-event"],
  name: "calendar",
  createdAt: "2026-09-10T20:16:12.741Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
