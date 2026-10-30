import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntryInstant = {
  id: "01a06827-ec0c-7d93-8f41-c7d2446c6d54",
  type: "page-type/page-type",
  slug: "tracking-entry-instant",
  definition: "a tracking entry for something that happens at an instant",
  extends: ["page-type/tracking-entry"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:44:01.932Z",
  updatedAt: "2026-10-30T16:49:55.788Z",
} as const satisfies PageType
