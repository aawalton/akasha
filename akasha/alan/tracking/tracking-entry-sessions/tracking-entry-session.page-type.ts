import type { PageType } from "@akasha/pages-system/page-type"
import type { TrackingEntry } from "../tracking-entries/tracking-entry.page-type.ts"

export type TrackingEntrySession = TrackingEntry

export const trackingEntrySession = {
  id: "01a06827-ec0c-7524-b2fe-dacf7e89d157",
  pageTypeSlug: "page-type",
  slug: "tracking-entry-session",
  definition: "a tracking entry for something that ran from one moment to another",
  pluralSlug: "tracking-entry-sessions",
  extendsSlug: "page-type/tracking-entry",
} as const satisfies PageType
