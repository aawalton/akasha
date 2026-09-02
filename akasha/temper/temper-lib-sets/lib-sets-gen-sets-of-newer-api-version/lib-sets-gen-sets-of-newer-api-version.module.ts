import type { Module } from "@akasha/code-system/module"

export const libSetsGenSetsOfNewerApiVersion = {
  id: "01a061fc-cee6-7d32-b8da-97ba90d2da12",
  pageTypeSlug: "module",
  slug: "lib-sets-gen-sets-of-newer-api-version",
  definition: "the set ids that exist only on a newer game API version",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
  ],
} as const satisfies Module
