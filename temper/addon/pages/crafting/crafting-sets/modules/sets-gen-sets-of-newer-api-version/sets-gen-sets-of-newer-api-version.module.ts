import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsGenSetsOfNewerApiVersion = {
  id: "01a061fc-cee6-7d32-b8da-97ba90d2da12",
  type: "page-type/module",
  slug: "sets-gen-sets-of-newer-api-version",
  definition: "the set ids that exist only on a newer game API version",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This table is ported from the upstream library at a pinned commit.",
    },
  ],
} as const satisfies Module
