import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const dayBoundary = {
  id: "01a05c77-31e4-7f97-8fe6-c273915285af",
  type: "domain",
  slug: "day-boundary",
  definition: "which day an instant falls on, where a day does not start at midnight",
  parts: [
    "module/day-string",
    "module/eso-day",
    "module/mountain-day",
    "module/mountain-wall",
    "module/us-zone-offset",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day is a dashed date rather than a Date.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No zone database is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A boundary is stored nowhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The day is derived in one place.",
    },
  ],
} as const satisfies Domain
