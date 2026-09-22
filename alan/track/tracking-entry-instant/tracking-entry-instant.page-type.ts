import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntryInstant = {
  id: "01a06827-ec0c-7d93-8f41-c7d2446c6d54",
  type: "page-type/page-type",
  slug: "tracking-entry-instant",
  definition: "a tracking entry for something that happened at a moment",
  extends: ["page-type/tracking-entry"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
