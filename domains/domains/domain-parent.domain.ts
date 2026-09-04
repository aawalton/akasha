import type { Domain } from "./domain.page-type.ts"

export const domainParent = {
  id: "01a0675b-16df-7224-bb73-2d7ff8395955",
  pageTypeSlug: "domain",
  slug: "domain-parent",
  definition: "the one domain a domain sits inside",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A domain needed only to read this one is required reading rather than its parent.",
    },
    {
      invariantKind: "departure",
      statement: "A layer a domain is built on is not a parent of it.",
    },
    {
      invariantKind: "departure",
      statement: "A page type extending `domain` is not a reason for `domain` to be a parent.",
    },
  ],
} as const satisfies Domain
