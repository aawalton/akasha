import type { Domain } from "../domain-system/domain/domain.page-type.ts"

export const akashaSeats = {
  id: "01a05012-41a2-7000-a31a-c92cbd92be43",
  pageTypeSlug: "domain",
  slug: "akasha-seats",
  definition: "seats, roles and personas kept in akasha",
  invariants: [
    {
      invariantKind: "gap",
      statement: "A seat, its role and its persona are each a page in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing outside akasha says what a seat is.",
    },
    {
      invariantKind: "gap",
      statement:
        "A seat at work keeps working while its page moves, so the migration never stops the seats making it.",
    },
  ],
} as const satisfies Domain
