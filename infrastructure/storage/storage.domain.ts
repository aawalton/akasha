import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const storage = {
  id: "01a0658b-0f02-7644-863a-eb9b17536f55",
  type: "page-type/domain",
  slug: "storage",
  definition: "where bytes live",
  parts: [
    "domain/backup",
    "domain/container-registry",
    "domain/database",
    "domain/disk-store",
    "domain/git-repo",
    "domain/object-store",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Durability is off by default in every store.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Durability is asked for one thing at a time.",
    },
  ],
} as const satisfies Domain
