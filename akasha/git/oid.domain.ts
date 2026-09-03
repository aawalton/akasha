import type { Domain } from "@akasha/domain-system/domain"

export const oid = {
  id: "01a06815-ceaf-7127-8234-36c9903aec73",
  pageTypeSlug: "domain",
  slug: "oid",
  definition: "the name git gives what it stores, worked out from the bytes themselves",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every name for a git object id is `oid`, or a scoped form of it.",
    },
  ],
} as const satisfies Domain
