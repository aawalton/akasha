import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const strengthDecline = {
  id: "01a0b71d-29d7-78fa-a2fa-467c181aa8d2",
  type: "page-type/page-type",
  slug: "strength-decline",
  definition: "a strength exercise Alan rejects on a day",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/exercise", required: true, many: false },
    { pageProperty: "calendar-date-property/decline-date", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["calendar-date-property/decline-date"],
  decisions: [
    {
      decisionKind: "decision-kind/upkeep",
      statement:
        "Every movement Alan turns down reaches a page, as every exercise set Alan performs does.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A decline says nothing of why Alan turned the movement down.",
    },
  ],
  createdAt: "2026-09-19T00:42:16.919Z",
  updatedAt: "2026-10-30T17:24:31.273Z",
} as const satisfies PageType
