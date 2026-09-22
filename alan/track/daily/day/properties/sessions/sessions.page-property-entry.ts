import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

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
  type: "page-type/page-property-entry",
  slug: "sessions",
  propertySlug: "sessions",
  definition: "every stretch of time a day was spent in, one to a line",
  parts: [
    "instant-property/asserted-at",
    "number-property/breathing-sets",
    "number-property/capacity-rate",
    "relation-property/daily-tracking",
    "text-property/difficulty-level",
    "text-property/end-time",
    "multi-relation-property/relationships",
    "relation-property/session-owner",
    "text-property/start-time",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/start-time", required: true, many: false },
    { pageProperty: "text-property/end-time", required: false, many: false },
    { pageProperty: "relation-property/daily-tracking", required: true, many: false },
    { pageProperty: "text-property/safety-level", required: false, many: false },
    { pageProperty: "text-property/difficulty-level", required: false, many: false },
    { pageProperty: "text-property/version", required: false, many: false },
    { pageProperty: "number-property/capacity-rate", required: false, many: false },
    {
      pageProperty: "multi-relation-property/relationships",
      required: false,
      many: true,
      maxCount: null,
    },
    { pageProperty: "instant-property/asserted-at", required: false, many: false },
    { pageProperty: "relation-property/session-owner", required: false, many: false },
    { pageProperty: "number-property/breathing-sets", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A question about a stretch is identified by a mark minted when the row is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A question about a stretch is never identified by that stretch's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch with no end is the stretch running now.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A stretch is a row here rather than a page a query may ask of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A calculation is handed the rows this file has in place of the extension the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is spelled as the file spells the row.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The two times a stretch has are instants, whose slugs close with `-at`.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "No change renames a field of a row, so a key here is rewritten by hand.",
    },
  ],
  types: "ts",
} as const satisfies PagePropertyEntry
