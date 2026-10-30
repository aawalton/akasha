import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntrySession = {
  id: "01a06827-ec0c-7524-b2fe-dacf7e89d157",
  type: "page-type/page-type",
  slug: "tracking-entry-session",
  definition: "a tracking entry for a tracked session",
  extends: ["page-type/tracking-entry"],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-03T16:44:01.932Z",
  updatedAt: "2026-10-30T16:50:31.336Z",
} as const satisfies PageType
