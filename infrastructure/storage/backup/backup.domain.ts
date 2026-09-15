import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const backup = {
  id: "01a0658b-0f02-7c83-b788-fe3d8bce0c2b",
  type: "page-type/domain",
  slug: "backup",
  definition: "a copy of what a store has, kept apart from that store",
  parts: ["domain/backup-retention"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A backup mirrors its store by default.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deletion from a store reaches that store's backup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Backups of the database are thinned as the backups age.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fewer database backups are kept the further back the backups go.",
    },
  ],
} as const satisfies Domain
