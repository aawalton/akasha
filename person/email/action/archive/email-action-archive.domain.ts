import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const emailActionArchive = {
  id: "01a0675b-16e2-769a-9b2a-c1b1edede150",
  type: "page-type/domain",
  slug: "email-action-archive",
  definition: "taking mail out of a person's inbox",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Mail is archived and never deleted.",
    },
  ],
  createdAt: "2026-09-03T13:00:18.018Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Domain
