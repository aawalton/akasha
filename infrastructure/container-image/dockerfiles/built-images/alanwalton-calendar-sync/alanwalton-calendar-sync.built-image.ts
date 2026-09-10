import type { BuiltImage } from "../built-image.page-type.types.ts"

export const alanwaltonCalendarSync = {
  id: "01a08194-af91-7bdd-8efa-017293025117",
  pageTypeSlug: "built-image",
  type: "built-image",
  slug: "alanwalton-calendar-sync",
  definition: "the image the calendar sync runs in",
  kind: "bun-service",
  folder: "alan/harness/calendar-sync",
} as const satisfies BuiltImage
