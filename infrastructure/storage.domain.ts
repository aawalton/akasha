import type { Domain } from "../domains/domain.page-type.ts"

export const storage = {
  id: "01a0658b-0f02-7644-863a-eb9b17536f55",
  pageTypeSlug: "domain",
  slug: "storage",
  definition: "where bytes live",
  partSlugs: [
    "domain/disk-store",
    "domain/backup",
    "domain/git-repos",
    "domain/container-registry",
    "domain/database",
    "workspace-package/object-store",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Durability is off by default in every store.",
    },
    {
      invariantKind: "departure",
      statement: "Durability is asked for one thing at a time.",
    },
  ],
} as const satisfies Domain
