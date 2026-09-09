import type { PageType } from "@akasha/pages/page-type"

export const trackingEntryInstant = {
  id: "01a06827-ec0c-7d93-8f41-c7d2446c6d54",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "tracking-entry-instant",
  definition: "a tracking entry for something that happened at one moment",
  pluralSlug: "tracking-entry-instants",
  extends: ["page-type/tracking-entry"],
  types: "ts",
} as const satisfies PageType
