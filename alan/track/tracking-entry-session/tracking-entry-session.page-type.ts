import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const trackingEntrySession = {
  id: "01a06827-ec0c-7524-b2fe-dacf7e89d157",
  type: "page-type/page-type",
  slug: "tracking-entry-session",
  definition: "a tracking entry for something that ran from one moment to another",
  extends: ["page-type/tracking-entry"],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
