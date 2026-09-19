import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const strengthDecline = {
  id: "01a0b71d-29d7-78fa-a2fa-467c181aa8d2",
  type: "page-type/page-type",
  slug: "strength-decline",
  definition: "one movement Alan turned down, and the day Alan turned it down",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/exercise", required: true, many: false },
    { pageProperty: "calendar-date-property/decline-date", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["calendar-date-property/decline-date"],
} as const satisfies PageType
