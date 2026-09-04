import type { Domain } from "../../../../domains/domains/domain.page-type.ts"

export const emailActionArchive = {
  id: "01a0675b-16e2-769a-9b2a-c1b1edede150",
  pageTypeSlug: "domain",
  slug: "email-action-archive",
  definition: "taking mail out of a person's inbox",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Mail is archived and never deleted.",
    },
  ],
} as const satisfies Domain
