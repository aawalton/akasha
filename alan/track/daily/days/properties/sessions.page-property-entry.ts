import type { PagePropertyEntry } from "akasha/pages/property-entries/page-property-entry.page-type.types.ts"

export type Sessions = "jsonl"

export type SessionRow = {
  readonly id?: string
  readonly title?: string
  readonly startTime?: string
  readonly endTime?: string
  readonly dailyTracking?: string
  readonly safetyLevel?: string | number
  readonly difficultyLevel?: string | number
  readonly version?: string
  readonly capacityRate?: number
  readonly relationships?: readonly string[]
  readonly assertedAt?: string
  readonly owner?: string
  readonly breathingSets?: number
}

export type WorkedSessions = readonly SessionRow[]

export const sessions = {
  id: "01a05fd8-c30f-799b-aa06-004072744b31",
  pageTypeSlug: "page-property-entry",
  type: "page-property-entry",
  slug: "sessions",
  propertySlug: "sessions",
  definition: "every stretch of time a day was spent in, one to a line",
  parts: [
    "instant-property/asserted-at",
    "number-property/breathing-sets",
    "number-property/capacity-rate",
    "text-property/daily-tracking",
    "text-property/difficulty-level",
    "text-property/end-time",
    "text-property/session-owner",
    "text-property/relationships",
    "text-property/start-time",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/start-time", required: true, many: false },
    { pageProperty: "text-property/end-time", required: false, many: false },
    { pageProperty: "text-property/daily-tracking", required: true, many: false },
    { pageProperty: "text-property/safety-level", required: false, many: false },
    { pageProperty: "text-property/difficulty-level", required: false, many: false },
    { pageProperty: "text-property/version", required: false, many: false },
    { pageProperty: "number-property/capacity-rate", required: false, many: false },
    { pageProperty: "text-property/relationships", required: false, many: false },
    { pageProperty: "instant-property/asserted-at", required: false, many: false },
    { pageProperty: "text-property/session-owner", required: false, many: false },
    { pageProperty: "number-property/breathing-sets", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A question about a stretch is identified by a mark minted when the row is written.",
    },
    {
      invariantKind: "departure",
      statement: "A question about a stretch is never identified by that stretch's title.",
    },
    {
      invariantKind: "departure",
      statement: "A stretch with no end is the stretch running now.",
    },
    {
      invariantKind: "gap",
      statement: "A stretch is a row here rather than a page a query may ask of.",
    },
    {
      invariantKind: "departure",
      statement:
        "A calculation is handed the rows this file has in place of the extension the page has.",
    },
    {
      invariantKind: "departure",
      statement: "A row is spelled as the file spells the row.",
    },
  ],
} as const satisfies PagePropertyEntry
