import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const oid = {
  id: "01a06815-ceaf-7127-8234-36c9903aec73",
  type: "page-type/domain",
  slug: "oid",
  definition: "a name that git makes from a file or folder",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every name for a git object id is `oid` or a scoped form of `oid`.",
    },
  ],
  createdAt: "2026-09-03T16:24:14.767Z",
  updatedAt: "2026-09-25T16:14:45.000Z",
} as const satisfies Domain
