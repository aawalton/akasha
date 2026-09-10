import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const learnEverything = {
  id: "01a0675b-16ec-72d1-93b1-36998a485b93",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "learn-everything",
  definition: "working through the whole map of knowledge",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A topic's mastery level is written to that topic's page and never told to Alan in any form.",
    },
    {
      invariantKind: "departure",
      statement: "The answers Alan got right and the answers Alan got wrong are told to Alan.",
    },
  ],
} as const satisfies Domain
