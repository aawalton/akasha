import type { PageType } from "@akasha/pages/page-type"

export const trackingEntrySession = {
  id: "01a06827-ec0c-7524-b2fe-dacf7e89d157",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "tracking-entry-session",
  definition: "a tracking entry for something that ran from one moment to another",
  pluralSlug: "tracking-entry-sessions",
  extends: ["page-type/tracking-entry"],
  types: "ts",
} as const satisfies PageType
