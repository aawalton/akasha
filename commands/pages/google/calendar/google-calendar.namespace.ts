import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const googleCalendar = {
  id: "01a08cf6-b1c5-79c3-82d3-dbfdb11be5de",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "google-calendar",
  definition: "the calendar Alan keeps with Google",
  parts: ["namespace/google-calendar-events"],
} as const satisfies Namespace
