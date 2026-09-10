import type { Domain } from "akasha/domains/domain.page-type.ts"

export const oid = {
  id: "01a06815-ceaf-7127-8234-36c9903aec73",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "oid",
  definition: "the name git gives what it stores, worked out from the bytes themselves",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every name for a git object id is `oid` or a scoped form of `oid`.",
    },
  ],
} as const satisfies Domain
