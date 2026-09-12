import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const storage = {
  id: "01a0658b-0f02-7644-863a-eb9b17536f55",
  type: "domain",
  slug: "storage",
  definition: "where bytes live",
  parts: [
    "domain/backup",
    "domain/container-registry",
    "domain/database",
    "domain/disk-store",
    "domain/git-repos",
    "domain/object-store",
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
