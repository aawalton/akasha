import type { Domain } from "../../../domains/domain.page-type.ts"

export const trackingCapture = {
  id: "01a0682f-644d-7d62-8403-54ae7215ee1b",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "tracking-capture",
  definition: "how something Alan did becomes an entry",
  pluralSlug: "tracking-captures",
  parts: [
    "domain/tracking-capture-report",
    "domain/tracking-capture-measurement",
    "domain/tracking-capture-trace",
    "domain/tracking-capture-testimony",
    "domain/tracking-capture-judgment",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every tracked field states the single capture its values come of.",
    },
    {
      invariantKind: "departure",
      statement: "A capture says how a value came to exist rather than how good the value is.",
    },
  ],
} as const satisfies Domain
