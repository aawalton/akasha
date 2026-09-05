import type { PagePropertyEntry } from "@akasha/pages/page-property-entry"

export type Sessions = "jsonl"

// A page file states this property as the extension of the file beside it, and a calculation is
// handed the rows themselves: the evaluator reads that file and puts its parsed lines under the
// key in place of the `"jsonl"` the page carries. A row is spelled as the file spells it.
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
  slug: "sessions",
  propertySlug: "sessions",
  definition: "every stretch of time a day was spent in, one to a line",
  partSlugs: [
    "instant-property/asserted-at",
    "number-property/breathing-sets",
    "number-property/capacity-rate",
    "text-property/daily-tracking",
    "text-property/difficulty-level",
    "text-property/end-time",
    "text-property/owner",
    "text-property/relationships",
    "text-property/start-time",
  ],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "start-time", required: true, many: false },
    { pagePropertySlug: "end-time", required: false, many: false },
    { pagePropertySlug: "daily-tracking", required: true, many: false },
    { pagePropertySlug: "safety-level", required: false, many: false },
    { pagePropertySlug: "difficulty-level", required: false, many: false },
    { pagePropertySlug: "version", required: false, many: false },
    { pagePropertySlug: "capacity-rate", required: false, many: false },
    { pagePropertySlug: "relationships", required: false, many: false },
    { pagePropertySlug: "asserted-at", required: false, many: false },
    { pagePropertySlug: "owner", required: false, many: false },
    { pagePropertySlug: "breathing-sets", required: false, many: false },
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
      statement: "A stretch carrying no end is the stretch running now.",
    },
    {
      invariantKind: "gap",
      statement: "A stretch is a row here rather than a page a query may ask of.",
    },
  ],
} as const satisfies PagePropertyEntry
