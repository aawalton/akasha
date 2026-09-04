import type { Domain } from "../domains/domains/domain.page-type.ts"

export const backup = {
  id: "01a0658b-0f02-7c83-b788-fe3d8bce0c2b",
  pageTypeSlug: "domain",
  slug: "backup",
  definition: "a copy of what a store holds, kept apart from that store",
  pluralSlug: "backups",
  partSlugs: ["workspace-package/backup-retention"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A backup mirrors its store by default.",
    },
    {
      invariantKind: "departure",
      statement: "A deletion from a store reaches that store's backup.",
    },
    {
      invariantKind: "departure",
      statement: "Backups of the database are thinned as the backups age.",
    },
    {
      invariantKind: "departure",
      statement: "Fewer database backups are kept the further back the backups go.",
    },
  ],
} as const satisfies Domain
