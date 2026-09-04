import type { PageType } from "@akasha/pages-system/page-type"
import type { TrackingEntry } from "../tracking-entries/tracking-entry.page-type.ts"

export type TrackingEntryInstant = TrackingEntry

export const trackingEntryInstant = {
  id: "01a06827-ec0c-7d93-8f41-c7d2446c6d54",
  pageTypeSlug: "page-type",
  slug: "tracking-entry-instant",
  definition: "a tracking entry for something that happened at one moment",
  pluralSlug: "tracking-entry-instants",
  extendsSlug: ["page-type/tracking-entry"],
} as const satisfies PageType
