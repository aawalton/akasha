import type { Domain } from "../../../domains/domain.page-type.ts"

export const day = {
  id: "01a05c77-31e4-7f97-8fe6-c273915285af",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "day",
  definition: "which day an instant falls on, where a day does not start at midnight",
  parts: [
    "module/day-string",
    "module/us-zone-offset",
    "module/eso-day",
    "module/new-york-wall",
    "module/mountain-day",
    "module/mountain-wall",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day is a dashed date rather than a Date.",
    },
    {
      invariantKind: "absence",
      statement: "No zone database is read.",
    },
  ],
} as const satisfies Domain
